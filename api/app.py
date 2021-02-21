from flask import Flask, request
from dotenv import load_dotenv
import psycopg2
import uuid
import requests
import csv
import os
from google.cloud import dialogflow
from google.protobuf.json_format import MessageToJson
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
load_dotenv()

PGHOST = os.getenv("PGHOST")
PGDATABASE = os.getenv('PGDATABASE')
GOOGLEMAPSKEY = os.getenv('GOOGLEMAPSKEY')
FILETOPARSE = os.getenv('FILETOPARSE')
PROJECTID = os.getenv('DIALOGPROJECTID')

SQL = """INSERT INTO markers(addr,city,facility_name,postal,cases,latitude,longitude)
             VALUES(%s,%s,%s,%s,%s,%s,%s); """

#1. data parsing csv files one time task
def parseCSVfile():
    with open(FILETOPARSE, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        facilities = {}
        for row in csv_reader:
            postal_code = row['Reporting_PHU_Postal_Code']
            city = row['Reporting_PHU_City']
            facility_name = row['Reporting_PHU']
            latitude = row['Reporting_PHU_Latitude']
            longitude = row['Reporting_PHU_Longitude']
            address = row['Reporting_PHU_Address']
            if facilities.get(postal_code) != None:
                facility = facilities.get(postal_code)
                facility["cases"]+=1
            else:
                new_facility = {
                    "postal_code": postal_code,
                    "city": city,
                    "facility_name": facility_name,
                    "latitude": latitude,
                    "longitude": longitude,
                    "address": address,
                    "cases": 1
                }
                facilities[postal_code] = new_facility
        try:
            cur = conn.cursor()
            for postCode in facilities:
                facilityData = facilities[postCode]
                cur.execute(SQL, (facilityData["address"],facilityData["city"],facilityData["facility_name"],facilityData["postal_code"],facilityData["cases"],facilityData["latitude"],facilityData["longitude"],))
            conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

#2. connect to geoencoding with credentials
def getGeoLatLong(location):
    response = requests.get("https://maps.googleapis.com/maps/api/geocode/json?address="+location +"&key=" +GOOGLEMAPSKEY + "&components=country:CA")
    if response.status_code == 200:
        body = response.json()
        if body["status"] == "INVALID_REQUEST" or body["status"] == 'ZERO_RESULTS':
            return None
        location = body["results"][0]["geometry"]["location"]
        return (location["lat"],location["lng"])
    return None

#4. should connect to the database
conn = psycopg2.connect(
    host=PGHOST,
    database=PGDATABASE)

def detect_intent(text,session_id):
    if session_id == None:
        session_id = uuid.uuid4()

    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(PROJECTID, session_id)
    text_input = dialogflow.TextInput(text=text, language_code='en')
    query_input = dialogflow.QueryInput(text=text_input)
    response = session_client.detect_intent(
            request={"session": session, "query_input": query_input}
        )
    print("=" * 20)
    print("Query text: {}".format(response.query_result.query_text))
    print(
            "Detected intent: {} (confidence: {})\n".format(
                response.query_result.intent.display_name,
                response.query_result.intent_detection_confidence,
            )
        )
    if response.query_result.all_required_params_present:
        display_name = response.query_result.intent.display_name
        if display_name== 'cases_intent' or display_name == 'facilities_intent':
            return (True,
            response.query_result.parameters["location"]["street-address"],
            response.query_result.parameters["geo-city"],
            response.query_result.intent.display_name,
            session_id,
            ) #all required, street, city, intent, session_id
        return (False,response.query_result.fulfillment_text,session_id,)

    return (False,response.query_result.fulfillment_text,session_id,)#False, fulfillment_messsage, session_id

#5. should be able to parse for the nearest location
def get_closest_facility(location):
    lat = location[0]
    lng = location[1]
    data = (lat,lng,lat, )
    try:
        cur = conn.cursor()
        cur.execute("""SELECT *,(
   3959 *
   acos(cos(radians(%s)) * 
   cos(radians(latitude)) * 
   cos(radians(longitude) - 
   radians(%s)) + 
   sin(radians(%s)) * 
   sin(radians(latitude)))
) AS distance  FROM markers ORDER BY distance LIMIT 1;""",data)
        row = cur.fetchone()
        return row
    except (Exception, psycopg2.DatabaseError) as error:
        return None

ROW_ID = 0
ADDRESS = 1
CITY = 2
FACILITY_NAME = 3
POSTAL = 4
CASES = 5
LATITUDE = 6
LONGITUDE = 7

@app.route("/bot/request",methods = ['POST'])
@cross_origin()
def request_chat():
    text = request.get_json().get('text')
    session_id = request.get_json().get('session_id')

    result = detect_intent(text,session_id)
    all_required_present = result[0]
    if all_required_present:
        geoLocation = getGeoLatLong(result[1] +","+ result[2])
        if geoLocation == None:
            return {"type": "ERROR"}, 400

        closest_facility = get_closest_facility(geoLocation)
        if closest_facility == None:
            return {"type": "ERROR"}, 400
        if result[3] == "cases_intent":
            return { "content": "There were " + str(closest_facility[CASES]) + " reported cases nearby", "type":"SUCCESS" }, 200
        elif result[3] == 'facilities_intent':
            return { "content": "The closest facility is at " + closest_facility[ADDRESS] + "," + closest_facility[CITY], "type":"SUCCESS" }, 200


    return { "content": result[1], "type": "NEEDS_MORE", "session_id": result[2]}, 200

#3. should serve a get response
@app.route("/location/request",methods = ['POST'])
@cross_origin()
def request_data():
    location = request.get_json().get('location')
    if location == None:
        return { "error": "Missing location" },400
    
    geoLocation = getGeoLatLong(location)
    if geoLocation == None:
        return {"error": "Could not interpret location"}, 400

    closest_facility = get_closest_facility(geoLocation)
    if closest_facility == None:
        return {"error": "No facilities found"}, 400
    return { "content": {"name": closest_facility[ADDRESS]} }, 200


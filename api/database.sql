CREATE TABLE IF NOT EXISTS markers(
  ID SERIAL PRIMARY KEY,
  addr VARCHAR(100),
  city VARCHAR(100),
  facility_name	VARCHAR(100),
  postal	VARCHAR(9),
  cases	INT,
  latitude	NUMERIC(10,8),
  longitude	NUMERIC(10,8)	
)
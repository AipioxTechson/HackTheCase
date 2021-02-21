
import { ChakraProvider } from "@chakra-ui/react"
import { Box, Flex, Button,Heading, Stack, HStack } from "@chakra-ui/react";
import { List, ListItem, ListIcon, OrderedList,
    UnorderedList, Text, Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'

const covidAtAGlance = [
  {
    text: "Data Dashboard",
    link: "https://informationisbeautiful.net/visualizations/covid-19-coronavirus-infographic-datapack/"
  },
  {
    text: "Riskiest Activities",
    link: "https://informationisbeautiful.net/visualizations/coronavirus-riskiest-activities/"
  },
  {
    text: "About Covid",
    link: "https://www.publichealthontario.ca/en/diseases-and-conditions/infectious-diseases/respiratory-diseases/novel-coronavirus/about-covid-19"
  },
  {
    text: "Symptoms",
    link: "https://www.ontario.ca/page/covid-19-stop-spread#section-0"
  }
]

const Prevention = [
  {
    text: "Prevention",
    link: "https://www.publichealthontario.ca/en/diseases-and-conditions/infectious-diseases/respiratory-diseases/novel-coronavirus/prevention-management"
  },
  {
    text: "Prevention Techniques",
    link: "https://www.canada.ca/en/public-health/services/publications/diseases-conditions/social-distancing.html"
  },
  {
    text: "Self assessment",
    link: "https://covid-19.ontario.ca/self-assessment/"
  },
  {
    text: "Multi-language COVID FAQ",
    link: "https://www.publichealthontario.ca/en/diseases-and-conditions/infectious-diseases/respiratory-diseases/novel-coronavirus/public-resources"
  }
]

const Other = [
  {
    text: "COVID results",
    link: "https://covid19results.ehealthontario.ca:4443/agree"
  },
  {
    text: "Vaccines",
    link: "https://covid-19.ontario.ca/covid-19-vaccines-ontario"
  },
  {
    text: "Stress buster",
    link: "https://www.mcsweeneys.net/"
  },
  {
    text: "How to Quarauntine",
    link: "https://www.canada.ca/en/public-health/services/publications/diseases-conditions/coronavirus-disease-covid-19-how-to-self-isolate-home-exposed-no-symptoms.html"
  }
]

function Links(){
  return(
    <HStack justify="center" spacing="20px" m={0,3} >
      <Flex boxShadow="lg" textAlign="left" w="33%" color='gray.400' pr={10} borderWidth="1px" borderColor="gray.400" borderRadius="md">
        <UnorderedList pl="20px" py="10px">
          <Heading fontSize="3xl" p={2}> COVID at a Glance </Heading>
          {covidAtAGlance.map(({text, link}) => <ListItem>
            <Link href={link} isExternal>
                {text} <ExternalLinkIcon mx="2px" />
              </Link>
          </ListItem>)}
        </UnorderedList>
      </Flex>
      <Flex boxShadow="lg" textAlign="left" w="33%" color='gray.400' pr={10} borderWidth="1px" borderColor="gray.400" borderRadius="md">
        <UnorderedList pl="20px" py="10px">
          <Heading fontSize="3xl" p={2}> Prevention & Safety </Heading>
            {Prevention.map(({text, link}) => <ListItem>
            <Link href={link} isExternal>
                {text} <ExternalLinkIcon mx="2px" />
              </Link>
          </ListItem>)}
        </UnorderedList>
      </Flex>
      <Flex boxShadow="lg" textAlign="left" w="33%" color='gray.400' pr={10} borderWidth="1px" borderColor="gray.400" borderRadius="md">
        <UnorderedList pl="20px" py="10px">
          <Heading fontSize="3xl" p={2}> Other Resources </Heading>
            {Other.map(({text, link}) => <ListItem>
            <Link href={link} isExternal>
                {text} <ExternalLinkIcon mx="2px" />
              </Link>
          </ListItem>)}
        </UnorderedList>
      </Flex>
    </HStack>


  );
}
export default Links

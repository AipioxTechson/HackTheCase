
import { ChakraProvider } from "@chakra-ui/react"
import { Box, Flex, Button,Heading, Stack, HStack } from "@chakra-ui/react";
import { List, ListItem, ListIcon, OrderedList,
    UnorderedList, Text, Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'

function Links(){
  return(
    <HStack justify="center" spacing="20px" m={0,3} >
      <Flex boxShadow="lg" textAlign="left" w="33%" color='gray.400' pr={10} borderWidth="1px" borderColor="gray.400" borderRadius="md">
        <UnorderedList pl="20px" py="10px">
          <Heading fontSize="3xl" p={2}> COVID at a Glance </Heading>
            <ListItem><Link href="https://informationisbeautiful.net/visualizations/covid-19-coronavirus-infographic-datapack/" isExternal>
              Data Dashboard <ExternalLinkIcon mx="2px" />
            </Link></ListItem>
            <ListItem><Link href="https://informationisbeautiful.net/visualizations/coronavirus-riskiest-activities/" isExternal>
              Riskiest Activities <ExternalLinkIcon mx="2px" />
            </Link></ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </UnorderedList>
      </Flex>
      <Flex boxShadow="lg" textAlign="left" w="33%" color='gray.400' pr={10} borderWidth="1px" borderColor="gray.400" borderRadius="md">
        <UnorderedList pl="20px" py="10px">
          <Heading fontSize="3xl" p={2}> H1 </Heading>
            <ListItem><Link href="https://informationisbeautiful.net/visualizations/covid-19-coronavirus-infographic-datapack/" isExternal>
              COVID Data Dashboard <ExternalLinkIcon mx="2px" />
            </Link></ListItem>
            <ListItem><Link href="https://informationisbeautiful.net/visualizations/coronavirus-riskiest-activities/" isExternal>
              Riskiest Activities <ExternalLinkIcon mx="2px" />
            </Link></ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </UnorderedList>
      </Flex>
      <Flex boxShadow="lg" textAlign="left" w="33%" color='gray.400' pr={10} borderWidth="1px" borderColor="gray.400" borderRadius="md">
        <UnorderedList pl="20px" py="10px">
          <Heading fontSize="3xl" p={2}> H1 </Heading>
            <ListItem><Link href="https://informationisbeautiful.net/visualizations/covid-19-coronavirus-infographic-datapack/" isExternal>
              COVID Data Dashboard <ExternalLinkIcon mx="2px" />
            </Link></ListItem>
            <ListItem><Link href="https://informationisbeautiful.net/visualizations/covid-19-coronavirus-infographic-datapack/" isExternal>
              Riskiest Activities <ExternalLinkIcon mx="2px" />
            </Link></ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </UnorderedList>
      </Flex>
    </HStack>


  );
}
export default Links

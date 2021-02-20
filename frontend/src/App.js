import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { Box, Flex, Button, ButtonGroup, Heading, Stack, VStack,
  HStack, StackDivider } from "@chakra-ui/react";
import { List, ListItem, ListIcon, OrderedList,
    UnorderedList, MdCheckCircle, MdSettings } from "@chakra-ui/react"
import { Center, Square, Circle } from "@chakra-ui/react"
import { Spacer} from "@chakra-ui/react"
import DarkModeToggle from './DarkModeToggle.js'
import { ColorModeScript } from "@chakra-ui/react"

function App() {
  return (
    <div className="App">
      <Box bg="teal.800" px={100} pt={100} pb={50} color='white'>
        <Heading fontSize="6xl" >COV</Heading>
      </Box>
      <Box textAlign="right" bg="teal.800" px={100} py={3} color='white'>
        <DarkModeToggle/>
      </Box>
      <HStack spacing="20px" m={0,2} >
      <Flex textAlign="left" w="33%"  color='gray.400' borderWidth="1px" borderColor="gray.400" borderRadius="md">
        <UnorderedList pl="20px" py="10px">
          <ListItem>Lorem ipsum dolor sit amet</ListItem>
          <ListItem>Consectetur adipiscing elit</ListItem>
          <ListItem>Integer molestie lorem at massa</ListItem>
          <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </UnorderedList>
      </Flex>
        <Flex textAlign="left" w="33%"  color='gray.400' borderWidth="1px" borderColor="gray.400" borderRadius="md">
        <UnorderedList pl="20px" py="10px">
          <ListItem>Lorem ipsum dolor sit amet</ListItem>
          <ListItem>Consectetur adipiscing elit</ListItem>
          <ListItem>Integer molestie lorem at massa</ListItem>
          <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </UnorderedList>
        </Flex>
        <Flex textAlign="left" w="33%"  color='gray.400' borderWidth="1px" borderColor="gray.400" borderRadius="md">
        <UnorderedList pl="20px" py="10px">
          <ListItem>Lorem ipsum dolor sit amet</ListItem>
          <ListItem>Consectetur adipiscing elit</ListItem>
          <ListItem>Integer molestie lorem at massa</ListItem>
          <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </UnorderedList>
        </Flex>

      </HStack>

    </div>
  );
}
export default App;

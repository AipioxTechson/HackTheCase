import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from "@chakra-ui/react"
import { Box, Flex, Button,Heading, Stack, HStack } from "@chakra-ui/react";
import { List, ListItem, ListIcon, OrderedList,
    UnorderedList, Text, Link } from "@chakra-ui/react"
import DarkModeToggle from './DarkModeToggle.js'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Chatroom from './Chatroom.js'
import Links from './links.js'

function App() {
  return (
    <div className="App">

      <Box bg="teal.800" px={100} pt={100} pb={50} color='white'>
        <Heading fontSize="6xl" >COVIDBrief</Heading>
      </Box>
      <Box textAlign="right"mb={3} bg="teal.800" px={100} py={3} color='white'>
        <DarkModeToggle/>
      </Box>
      <Chatroom/>
      <Links/>



    </div>
  );
}
export default App;

import React, { useRef, useState } from 'react';
import { Box, Flex, Button,Heading, Stack, HStack } from "@chakra-ui/react";
import { List, ListItem, ListIcon, OrderedList,
    UnorderedList, Text, Textarea, Input, Editable } from "@chakra-ui/react"

function Chatroom() {
  const [messages,setMessages] = useState([]) // {type: user/bot, message: message}
  const sessionRef = useRef(null)
  const [formText ,setFormText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessages((oldMessages) => [...oldMessages,{type:'user', message: formText}])
    setFormText('')
    const data = {
      text: formText,
      ...(sessionRef.current ? {session_id: sessionRef.current} :{})
    }
     fetch("http://localhost:5000/bot/request", {
       method: "POST",
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(data)
     }).then(async response => {
       if (response.ok){
         const result = await response.json()
         setMessages((oldMessages) => [...oldMessages,{type:'bot', message: result.content}])
         if (result.type === 'NEEDS_MORE'){
           sessionRef.current = result.session_id
         }else {
           sessionRef.current = null
         }
       }else {
         setMessages((oldMessages) => [...oldMessages,{type:'bot', message: 'I could not understand'}])
         sessionRef.current = null
       }
    })
  }

  const handleChange = (e) => setFormText(e.target.value)
return (
    <Flex className="chatWindow" my={3} m="auto" w="60%" color='gray.400' px={5}
    borderWidth="1px" borderColor="gray.400" borderRadius="md" h="auto" flexDirection='column'>
        <ul className="chat" id="chatList" list-style-type="none" >
          {messages.map(({type, message}, index) => (
            <div key={index}>
              {type === 'user' ? (
                <li className="self">
                    <Heading fontSize="md" pt={6} pb={1} textAlign="right">User</Heading>
                      <Box className="msg" float="right" textAlign="right" borderWidth="1px" borderColor="gray.300" borderRadius="md" p={2}>
                        <Box className="message"> {message}</Box>
                      </Box>
                </li>
              ) : (
                <li className="other">
                  <Heading fontSize="md"  pt={6} pb={1} textAlign="left">Bot</Heading>
                    <Box className="msg" float="left" textAlign="left" borderWidth="1px" borderColor="gray.300" borderRadius="md" p={2}>
                     <Box className="message"> {message} </Box>
                    </Box>
                </li>
              )}
            </div>
          ))}
        </ul>
        <Box className="chatInputWrapper" mb={0} py={2} >
          <form onSubmit={handleSubmit} bg="teal.800" m={0}>
            <Input
              className="textarea input"
              type="text"
              value={formText}
              placeholder="Enter your message..."
              onChange={handleChange}
            />
          </form>
        </Box>
      </Flex>
  );
}
export default Chatroom;

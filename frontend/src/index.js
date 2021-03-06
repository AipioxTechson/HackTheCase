import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react"



ReactDOM.render(
  <React.StrictMode>
  <ChakraProvider theme={theme}>
  <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
  </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

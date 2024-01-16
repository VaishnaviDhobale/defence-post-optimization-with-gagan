import React from 'react';
import "./App.css";
import { Box } from "@chakra-ui/react";
import {MainRoutes} from "./Pages/MainRoutes"

function App() {
  return (
    <Box className="App" fontFamily={"inter"}>
     <MainRoutes />
    </Box>
  );
}

export default App;

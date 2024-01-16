import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useToast,
  Input,
} from "@chakra-ui/react";
import axios from "axios";

export function BlockedUsers() {
 

  
  
  

  
  useEffect(() => {
    getAllBlockedUserData();
  }, []);
  // console.log(allBlockedUserData);

  return (
    <Box>
        <Button
          ml={"20px"}
          backgroundColor={"#00acee"}
          color={"white"}
          fontWeight={"500"}
          h={"30px"}
          onClick={() => {
            setShowBlockData(!showBlockData);
          }}
        >
          {showBlockData ? "Hide Blocked Users" : "Blocked Users"}
        </Button>

      {/*  table */}
        {!allBlockedUserData.length > 0 && showBlockData && (
        <Box>You dont have blocked users</Box>
      )}
      {/* <hr style={{marginTop : "0px"}} /> */}
    </Box>
  );
}

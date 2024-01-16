import { Box, Button, Text,useToast } from "@chakra-ui/react";
import axios from "axios";
import { AiFillFilePdf, AiTwotoneEdit } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
// import {pdf} from "../Images/"
export function FreeCart({data}) {
  let {ele,handleDelete,updateFreeForm} = data;
  // console.log(ele)
  return (
    <>
      <Box
        boxShadow={
          "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
        }
        width={"100%"}
        borderRadius={"10px"}
        position={"relative"}
      >
        <Box>
          <Box
            cursor={"pointer"}
            color={"#00acee"}
            position={"absolute"}
            right={"40px"}
            top={"3px"}
            fontSize={"24px"}
          >
            <AiTwotoneEdit  onClick={()=>{
              updateFreeForm(ele)
            }}/>
          </Box>
          <Box
            cursor={"pointer"}
            color={"red"}
            fontSize={"30px"}
            position={"absolute"}
            right={"2px"}
          >
            <TiDeleteOutline onClick={()=>{
              handleDelete(ele._id)
            }} />
          </Box>
        </Box>
        <Box
          display={"inline-block"}
          backgroundColor={"gray.100"}
          width={"100%"}
          textAlign={"center"}
          padding={"60px"}
          borderTopLeftRadius={"10px"}
          borderTopRightRadius={"10px"}
        >
          <Box display={"inline-block"} fontSize={"40px"}>
            <AiFillFilePdf style={{ color: "#00acee" }} />
          </Box>
        </Box>
        <Box padding={"20px"}>
          <Text fontSize={"25px"} fontWeight={"bold"}>
           {ele.name}
          </Text>
          <Button
            backgroundColor={"#00acee"}
            color={"white"}
            fontWeight={"500"}
            width={"100%"}
            marginTop={"20px"}
            borderRadius={"20px"}
            fontSize={"19px"}
          >
            <Link target = "_blank">View</Link>
          </Button>
        </Box>
      </Box>
    </>
  );
}

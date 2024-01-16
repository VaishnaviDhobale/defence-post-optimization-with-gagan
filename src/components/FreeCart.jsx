import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";

export function FreeCart({ data }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Box
        boxShadow={
          "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
        }
        width={"100%"}
        borderRadius={"10px"}
        transition="transform 0.3s ease-in-out" // Add a CSS transition
        transform={isHovered ? "scale(1.09)" : "scale(1)"} // Scale up on hover
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        cursor={"pointer"}
      >
        <Box
          display={"inline-block"}
          backgroundColor={"gray.100"}
          width={"100%"}
          textAlign={"center"}
          padding={"60px"}
          borderTopLeftRadius={"10px"}
          borderTopRightRadius={"10px"}
        >
          <Box display={"inline-block"} fontSize={"50px"}>
            <AiFillFilePdf style={{ color: "#28a4de" }} />
          </Box>
        </Box>
        <Box padding={"20px"}>
          <Text fontSize={"25px"} fontWeight={"bold"}>
            {data.name}
          </Text>
          <Link to={`/viewfreedata/${data._id}`}>
            <Button
              backgroundColor={"#28a4de"}
              color={"white"}
              fontWeight={"500"}
              width={"100%"}
              marginTop={"20px"}
              borderRadius={"20px"}
              fontSize={"19px"}
            >
              View
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

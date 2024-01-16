import { Box, Text } from "@chakra-ui/react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";
import pdf from "../Images/mba.pdf";
import { BiSolidLock } from "react-icons/bi";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export function ViewPdf({ link, name, tag, courseName }) {
  let [showAlert, setShowAlert] = useState(false);
  let handleTag = () => {
    if (tag == "paid") {
      setShowAlert(true);
    }
  };
  console.log(link, name, tag, courseName );
  return (
    <>
      <Box
        display={"flex"}
        gap={"20px"}
        alignItems={"center"}
        marginBottom={"20px"}
        position={"relative"}
        ml={"12px"}
      >
        <AiOutlineFilePdf style={{ color: "red", fontSize: "40px" }} />
        {tag == "free" && (
          <Link
            to={tag == "free" ? link : null}
            target="_blank"
            style={{ fontSize: "20px" }}
          >
            {courseName}
          </Link>
        )}
        {tag == "paid" && (
          <Text
            fontSize={"20px"}
            cursor={"pointer"}
            onClick={() => {
              setShowAlert(!showAlert);
            }}
          >
            {courseName}
          </Text>
        )}
        {tag == "free" ? (
          <Text
            fontSize={"15px"}
            textAlign={"right"}
            position={"absolute"}
            right={"0px"}
            color={"white"}
            fontWeight={"bold"}
            backgroundColor={"green"}
            padding={"2px 10px"}
            borderRadius={"10px"}
          >
            Free
          </Text>
        ) : (
          <Text
            fontSize={"20px"}
            textAlign={"right"}
            position={"absolute"}
            right={"0px"}
            color={"white"}
            fontWeight={"bold"}
            backgroundColor={"red"}
            padding={"5px 10px"}
            borderRadius={"10px"}
          >
            <BiSolidLock />
          </Text>
        )}
        {showAlert && (
          <Box
            padding={"15px 10px"}
            fontWeight={"bold"}
            fontSize={{base : "15px",sm : "20px"}}
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            width={{ base: "200px", md: "400px" }}
            position={"absolute"}
            // bottom={"20px"}
            left={"90px"}
            zIndex={1000}
            backgroundColor={"white"}
            borderRadius={"10px"}
            roundedBottomLeft={"0px"}
          >
            <Text>Please process to buy the course</Text>
            <Text
              position={"absolute"}
              right={"5px"}
              top={"5px"}
              cursor={"pointer"}
              onClick={()=>{
                setShowAlert(false)
              }}
            >
              <IoCloseSharp
                style={{
                  backgroundColor: "red",
                  borderRadius: "50%",
                  color: "white",
                }}
              />
            </Text>
          </Box>
        )}
      </Box>
      <hr style={{ marginBottom: "20px" }} />
    </>
  );
}

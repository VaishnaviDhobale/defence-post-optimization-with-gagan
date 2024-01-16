import { Box, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Img from "../Images/img.jpg";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export function SingleCourse({ data }) {
  let { ele, handleDelete,updateCourseForm } = data;
  console.log(ele)
  return (
    <>
      <Box boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" borderRadius={"10px"}>
        <Box>
          <Image
            borderTopLeftRadius={"10px"}
            borderTopRightRadius={"10px"}
            src={ele.thumbnail}
            width={"100%"}
            h={"250px"}
          ></Image>
        </Box>
        <Box padding={"10px"} textAlign={"left"}>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            {ele?.title?.substring(0,29)}...
          </Text>

          {/* Price starts */}
          <Box display={"flex"} marginTop={"10px"} alignItems={"center"}>
            <Text fontSize={"27px"}>
              <span
                style={{
                  fontSize: "16px",
                  position: "relative",
                  bottom: "5px",
                }}
              >
                ₹
              </span>
              {ele.price}
            </Text>
            <Text color={"Gray"} marginLeft={"10px"}>
              <del>₹{ele.sellPrice}</del>
            </Text>
            <Text marginLeft={"10px"} color={"green"}>
              ( {ele.discount}% OFF )
            </Text>
          </Box>
          {/* Price ends */}

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            marginTop={"10px"}
            alignItems={"center"}
            fontWeight={"bold"}
          >
            <Box>
              {/* Edit button  */}
              <Button
                backgroundColor={"#00ACEE"}
                color={"white"}
                fontWeight={"500"}
                marginRight={"10px"}
                onClick={()=>{
                  updateCourseForm(ele)
                }}
              >
                <BiSolidMessageSquareEdit />
              </Button>

              {/* Delete Button  */}
              <Button
                backgroundColor={"red"}
                color={"white"}
                fontWeight={"500"}
                onClick={() => {
                  handleDelete(ele._id);
                }}
              >
                <AiFillDelete />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

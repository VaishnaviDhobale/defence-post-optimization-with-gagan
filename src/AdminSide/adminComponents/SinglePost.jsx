import { Box, Text, Button } from "@chakra-ui/react";
import { BsCalendarDate } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export function SinglePost({ data }) {
  let {ele,handleDelete,updatePostForm} = data

  // to convert text into html 
  function ComponentWithHTML({ htmlString }) {
    return (
      <Box>
        <Text>{htmlString}</Text>
      </Box>
    );
  }
  return (
    <>
      <Box textAlign={"left"} position={"relative"}>
        <Link to={"/singlepostpage"}>
          <Box
            display={{
              base: "block",
              md: "flex",
            }}
            alignItems={"center"}
            gap={"20px"}
          >
            <Text
              fontSize={"22px"}
              color={"#00ACEE"}
              fontWeight={"bold"}
              marginBottom={"10px"}
            >
              {ele.heading}
            </Text>
          </Box>
          <Box>
            <Text display={"inline-block"}>
              {ele?.intro?.substring(0,400)}..{" "}
              <Link to={"/singlepostpage"} style={{ color: "gray" }}>
                Read More
              </Link>
            </Text>
          </Box>
        </Link>
      </Box>
      <Box display={"flex"} gap={"20px"} marginTop={"20px"}>
        <Box display={"flex"} gap={"8px"}>
          <BsCalendarDate style={{ fontSize: "16px" }} />
          <Text color={"gray"} fontSize={"13px"}>
            {ele.date}
          </Text>
        </Box>
        <Box display={"flex"} gap={"8px"}>
          <BiCategoryAlt />
          <Text
            color={"gray"}
            fontSize={"17px"}
            position={"relative"}
            bottom={"5px"}
          >
            {ele.category}
          </Text>
        </Box>
      </Box>
      <Box display={"flex"} marginTop={"20px"} cursor={"pointer"}>
        {/* Edit button  */}
        <Text
          color={"#00ACEE"}
          fontWeight={"500"}
          marginRight={"10px"}
          fontSize={"25px"}
        >
          <BiSolidMessageSquareEdit onClick={()=>{
            updatePostForm(ele)
          }} />
        </Text>

        {/* Delete Button  */}
        <Text
          color={"red"}
          fontWeight={"500"}
          fontSize={"25px"}
        >
          <AiFillDelete onClick={()=>{
            handleDelete(ele._id)
          }}/>
        </Text>
      </Box>
      <hr
        style={{
          marginTop: "20px",
          border: "1.2px solid #e9edf3",
          marginBottom: "40px",
        }}
      />
    </>
  );
}

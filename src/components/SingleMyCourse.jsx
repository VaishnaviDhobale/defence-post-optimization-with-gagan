import React, { useState } from 'react';
import { Box, Text, Image, Button } from "@chakra-ui/react";
import Img from "../Images/img.jpg";
import { Link } from "react-router-dom";

export function SingleMyCourse({data}) {
    console.log(data)
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
    <Link to={`/mycoursedetail/${data._id}/${data.courseId}`}>
      <Box
        cursor={"pointer"}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        borderRadius={"10px"}
        transition="transform 0.3s ease-in-out" // Add a CSS transition
        transform={isHovered ? "scale(1.09)" : "scale(1)"} // Scale up on hover
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box>
          <Image
            borderTopLeftRadius={"10px"}
            borderTopRightRadius={"10px"}
            src={data.thumbnail}
            width={"100%"}
            h={"250px"}
          ></Image>
        </Box>
        <Box padding={"10px"} textAlign={"left"}>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            {data?.title?.substring(0, 29)}...
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
              {data.sellPrice}
            </Text>
            <Text color={"Gray"} marginLeft={"10px"}>
              <del>₹{data.price}</del>
            </Text>
            <Text marginLeft={"10px"} color={"green"}>
              ( {data.discount}% OFF )
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
            <Text color={"#9a9a9a"}>{data.CourseName}</Text>
            <Button
              backgroundColor={"#28a4de"}
              color={"white"}
              fontWeight={"500"}
            >
              View Course
            </Button>
          </Box>
        </Box>
      </Box>
    </Link>
    </>
  );
}

import { Box, Image, Text } from "@chakra-ui/react";
import profileImg from "../Images/profile.png";
import "../css/navbar.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating-stars-component";


export function Slide({ data }) {
  return (
    <>
      <Box
        display={{
          base : "",
          sm : "grid"
        }}
        gridTemplateColumns={"20% 1fr"}
        textAlign={{base : "center",md : "left"}}
        width={"500px"}
        gap={"15px"}
        className="slide"
        fontFamily={"Barlow"}
      >
        <Box className="left" display={{
          base : "none",
          sm : "block"
        }}>
          <Image width={"100px"} src={profileImg}></Image>
        </Box>
        <Box className="right">
          <Box className="right-top" display={"flex"}>
            <Text fontSize={"23px"} fontWeight={"bold"}>
              {data.name}
            </Text>
            <Text
              marginLeft={"20px"}
              color={"#d0d0d0"}
              fontSize={"13px"}
              position={"relative"}
              top={"10px"}
            >
             {data.date.substring(0,9)}
            </Text>
          </Box>
          <Rating
            count={5} // Number of stars
            value={data.rating} // Current rating value
            onChange={(newRating) => setRating(newRating)} // Handle rating change
            size={20} // Size of the stars
            activeColor="#daa520" // Color of the active (filled) stars
            inactiveColor="#e4e4e4" // Color of the inactive (empty) stars
          />
          <Box>
            <Text color={"gray"} maxWidth={{
              base : "80vw",
              sm : "90vw",
              md : "100%"
            }} marginBottom={"30px"} textAlign={"left"} hyphens={"auto"}>
             {data.review}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}

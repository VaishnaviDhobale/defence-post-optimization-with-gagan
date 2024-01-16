import { Box, Text } from "@chakra-ui/react";
import { BiSad, BiHappy } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "react-rating-stars-component";

export function ViewReview({ data }) {
  return (
    <>
      <Box className="right">
        <Box className="right-top" display={"flex"}>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            {data.name}
          </Text>
          <Text
            marginLeft={"20px"}
            color={"#d0d0d0"}
            fontSize={"13px"}
            position={"relative"}
            top={"10px"}
          >
            {data.date.substring(0, 10)}
          </Text>
        </Box>
        <Box
          className="rating"
          display={"flex"}
          gap={"5px"}
          fontSize={"13px"}
          color={"#fdd54e"}
          marginBottom={"10px"}
          // marginTop={"2px"}
        >
          <Rating
            count={5} // Number of stars
            value={data.rating} // Current rating value
            onChange={(newRating) => setRating(newRating)} // Handle rating change
            size={20} // Size of the stars
            activeColor="#daa520" // Color of the active (filled) stars
            inactiveColor="#e4e4e4" // Color of the inactive (empty) stars
          />
        </Box>
        <Box>
          <Text
            color={"gray"}
            maxWidth={{
              base: "80vw",
              sm: "90vw",
              md: "100%",
            }}
            marginBottom={"30px"}
            textAlign={"left"}
            hyphens={"auto"}
          >
           {data.review}
          </Text>
        </Box>
      </Box>
      <hr style={{ marginBottom: "20px" }} />
    </>
  );
}

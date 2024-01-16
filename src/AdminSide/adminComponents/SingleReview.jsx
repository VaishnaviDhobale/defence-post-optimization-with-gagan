import { Box, Button, Text } from "@chakra-ui/react";
import Rating from "react-rating-stars-component";

export function SingleReview({ data,handleReviewDelete }) {
  return (
    <>
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
            {data.date}
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
            marginBottom={"20px"}
            textAlign={"left"}
            hyphens={"auto"}
          >
            {data.review}
          </Text>
          <Text
            backgroundColor={"red"}
            width={"50px"}
            textAlign={"center"}
            mb={"30px"}
            color={"white"}
            borderRadius={"10px"}
            p={"5px 0px"}
            fontSize={"12px"}
            cursor={"pointer"}
            onClick={()=>{
                handleReviewDelete(data._id)
            }}
          >
            Delete
          </Text>
        </Box>
      </Box>
      <hr style={{ marginBottom: "20px" }} />
    </>
  );
}

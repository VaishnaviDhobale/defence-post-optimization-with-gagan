import { Box, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CharByCharAnimation } from "./CharByCharAnimation";
import HomePageImg from "../Images/HomePageImg.gif";
import HomePageVideo from "../Images/HomePageVideo.mp4";
import { WordRun } from "./WordRun";

export function HomeBox1() {
  let wordArray = ["CDS?", "AFCAT?", "SSB?"];
  return (
    <>
      <Box
        className="Box1"
        display={{
          base: "",
          lg: "flex",
        }}
        justifyContent={"space-between"}
        marginBottom={"10px"}
      >
        <Box
          className="left"
          textAlign={{
            base: "center",
            lg: "left",
          }}
          width={{
            base: "100%",
            lg: "39%",
          }}
          paddingTop={"20px"}
          marginBottom={{
            base: "40px",
            lg: "0px",
          }}
        >
          {/* <h1> */}
          <Text
            fontSize={{
              base: "43px",
              sm: "60px",
              lg: "60px",
            }}
            color={"#000000"}
            fontWeight={"bold"}
            // lineHeight={"80px"}
            marginBottom={"25px"}
            fontFamily={"Barlow"}
          >
           <h1>Want To Clear{" "}</h1>
            <span style={{ color: "#29a4de" }}>
              <WordRun wordArray={wordArray} />
            </span>
          </Text>
          {/* </h1> */}

          <h2
            style={{
              marginBottom: "30px",
              fontFamily: "Barlow",
              marginTop: "-15px",
            }}
          >
            We make your preparation easy and simple. We give the best CDS study
            material and Notes for CDS preparation in the form of E-Booklets
            added with graphics and illustrations. Our interactive E-Booklets
            save your preparation time and help you to learn easily.
          </h2>
          <Button
            backgroundColor={"#29a4de"}
            color={"white"}
            fontWeight={"500"}
            fontFamily={"Barlow"}
          >
            <Link to={"/course"}> Start Learning</Link>
          </Button>
        </Box>
        <Box className="right">
          <Image
            w={{ base: "600px" }}
            h={{ base: "300px", sm: "380px" }}
            margin={"auto"}
            mt={"30px"}
            src={HomePageImg}
          ></Image>
          {/* <video autoplay loop> 
          <source src = {HomePageImg} type="video/mp4" /> 
         </video> */}
        </Box>
      </Box>
    </>
  );
}

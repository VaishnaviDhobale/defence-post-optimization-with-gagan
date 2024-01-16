import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import { Box, Text } from "@chakra-ui/react";
import { Spinar } from "../components/Spinar";
import { baseUrl } from "../BaseUrl";

export function ViewFreeData() {
  let [freeData, setFreeData] = useState({});
  let [isLoading,setIsLoading] = useState(false)

  let id = useParams().freeDataId;
  // console.log(id)
  async function getSingleFreeData() {
    try {
      setIsLoading(true)
      let data = await axios.get(`${baseUrl}/free/${id}`);
      //   console.log(data?.data)
      setFreeData(data?.data);
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      alert(err);
    }
  }
  useEffect(() => {
    getSingleFreeData();
  }, []);

  console.log(freeData.freePdfName);
  if(isLoading){
    return <>
     <Navbar />
     <Spinar/>
    </>
  }
  return (
    <>
      <Navbar />
      {freeData?.freePdf?.map((ele, index) => {
        return (
          <Box>
            <Box
              display={"flex"}
              gap={"20px"}
              alignItems={"center"}
              marginBottom={"20px"}
              fontFamily={"Barlow"}
            >
              <AiOutlineFilePdf
                style={{ color: "red", fontSize: "40px", marginLeft: "20px" }}
              />

              <Link to={ele} target="_blank" style={{ fontSize: "20px" }}>
                {freeData.freePdfName[index]}
              </Link>
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
                mr={"20px"}
              >
                Free
              </Text>
            </Box>
            <hr style={{ border: "1px solid gray.400", margin: "20px 0px" }} />
          </Box>
        );
      })}
    </>
  );
}

import { Box, grid } from "@chakra-ui/react";
import { SingleCourse } from "../components/SingleCourse";
import { Navbar } from "../components/Navbar";
import { useState,useEffect } from "react";
import axios from "axios";
import { Spinar } from "../components/Spinar";
import { baseUrl } from "../BaseUrl";


export function Course() {
  let [courseData,setCourseData] = useState([])
  let [isLoading,setIsLoading] = useState(false)

  let getCourseData = async() => {
    try{
      setIsLoading(true)
      let dataCourse = await axios?.get(`${baseUrl}/course/`);
      setCourseData(dataCourse?.data)
      setIsLoading(false)
    }catch(err){
      setIsLoading(false)
      alert(err)
    }
  }
  useEffect(()=>{
    localStorage.setItem('prevPage', null);
    getCourseData();
  },[])
  // console.log(courseData)
  if(isLoading){
    return <>
     <Navbar />
     <Spinar/>
    </>
  }
  return (
    <>
      <Navbar />
      <Box
        display={"grid"}
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
        gap={"50px"}
        margin={{ base: "30px 20px", sm: "30px 60px" }}
        fontFamily={"Barlow"}
      >
        {courseData && courseData?.map((ele,index)=>{
          return <SingleCourse data = {ele}/>
        })}        
      </Box>
    </>
  );
}

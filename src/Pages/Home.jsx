import { HomeBox1 } from "../components/HomeBox1";
import { HomeBox2 } from "../components/HomeBox2";
import { Footer } from "../components/Footer";
import { Box } from "@chakra-ui/react";
import { HomeBox3 } from "../components/HomeBox3";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {Spinar} from "../components/Spinar"
import axios from "axios";
import { baseUrl } from "../BaseUrl";

export function Home() {
  // let baseUrl = "https://backend.defencepost.in";

  let [isLoading,setIsLoading] = useState(false)
  let [test,setTest] = useState(false)
  let [allCourseData,setAllCourseData] = useState([])
  let [allReview, setAllReview] = useState([]);
  let [bestReview, setBestReview] = useState([]);




  // get all course data 
  async function getAllCourseData(){
    try{
      setIsLoading(true)
      let courseData = await axios.get(`${baseUrl}/course/`);
      setAllCourseData(courseData?.data);
      setIsLoading(false)
    }catch(err){
      setIsLoading(false)
      alert(err)
    }
  }

  // get All review data for home box 3
  let getAllReview = async () => {
    try {
      let dataReview = await axios.get(`${baseUrl}/review/`);
      setAllReview(dataReview?.data);
      const bestReviews = dataReview?.data?.filter(
        (ele) => ele?.rating === "4" || ele?.rating === "5"
      );
      console.log(bestReviews);
      setBestReview(bestReviews);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(()=>{
    getAllCourseData();
    getAllReview()
    localStorage.setItem('prevPage', null);
  },[])

  if(isLoading){
    return <>
     <Navbar />
    <Spinar/>
    </>
  }
  return (
    <>
    <Navbar />

      <Box  margin={{ base: "30px 20px", sm: "30px 60px" }}>
        <HomeBox1/>       
         <HomeBox2 allCourseData={allCourseData} />
        <HomeBox3 allReview={allReview} bestReview={bestReview}/>
      </Box>
      <Footer />
    </>
  );
}

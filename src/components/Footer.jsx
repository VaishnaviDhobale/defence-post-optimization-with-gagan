import { Box, Text, Image } from "@chakra-ui/react";
import imageLogo from "../Images/DefencePostFooter.png";
import { Link } from "react-router-dom";
import {
  BiLogoYoutube,
  BiLogoInstagramAlt,
  BiLogoTelegram,
  BiLogoTwitter,
} from "react-icons/bi";

import { MdEmail } from "react-icons/md";
import { BiSolidPhone } from "react-icons/bi";
import "../css/footer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../BaseUrl";

export function Footer() {
  // let baseUrl = "https://backend.defencepost.in";
  let [courseData,setCourseData] = useState([])
  async function getCourseData(){
    try{
      let data = await axios.get(`${baseUrl}/course/`);
      // console.log(data);
      setCourseData(data.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getCourseData()
  },[]);

  return (
    <Box
      className="footer"
      color={"white"}
      backgroundColor={"#29a4de"}
      padding={"40px"}
      marginTop={"50px"}
      fontFamily={"Barlow"}
    >
      <Box
        className="upperFooter"
        display={"grid"}
        gridTemplateColumns={{
          base: "",
          sm: "",
          md: "40% 1fr 1fr 10%",
          lg: "30% 1fr 1fr 20%",
        }}
        gap={{
          base: "40px",
        }}
        justifyContent={"space-between"}
        textAlign={"left"}
        fontSize={"17px"}
        paddingBottom={"40px"}
      >
        {/* box-1  */}
        <Box className="box1">
          <Image src={imageLogo} width={"200px"} />
          <Text color={"white"} padding={"20px 0"}>
          Made for aspiring defence aspirants <br/>By an EX aspirant.
          </Text>

          {/* Email or phone starts  */}
          <Box display={"flex"} marginBottom={"7px"}>
            <MdEmail
              style={{ fontSize: "20px", position: "relative", top: "2.5px" }}
            />
            <a href={`mailto:${"gauravsmitawa@gmail.com"}`} style={{ marginLeft : "10px"}}>gauravsmitawa@gmail.com</a>
          </Box>
          <Box display={"flex"}>
            <BiSolidPhone
              style={{ fontSize: "20px", position: "relative", top: "2.5px" }}
            />
            <Text marginLeft={"10px"}>9671381589</Text>
          </Box>
        </Box>
        {/* Email or phone ends  */}

        {/* box-2  */}
        <Box
          className="box2"
          display={"flex"}
          flexDirection={"column"}
          gap={"15px"}
          fontSize={"17px"}
        >
          {
            courseData?.slice(0, 4).map((ele,index)=>{
              return <Link to={`/viewdetails/${ele._id}`}>{ele.name}</Link>
            })
          }
          <Link to={"https://merchant.razorpay.com/policy/MiZvkPRA3rk7dN"}>Privacy Policy</Link>
          <Link to={"https://merchant.razorpay.com/policy/MiZvkPRA3rk7dN/refund"}>Cancellation & Refund Policy</Link>
        </Box>

        {/* box-3  */}
        <Box className="box3">
          <Box
            // className="nav"
            fontSize={"17px"}
            display={"flex"}
            gap={"15px"}
            flexDirection={"column"}
          >
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/mycourse">My Course</Link>
            <Link to="/free">Free Resources</Link>
            <Link to="https://merchant.razorpay.com/policy/MiZvkPRA3rk7dN/terms">Terms & Conditions</Link>
            <Link to="https://merchant.razorpay.com/policy/MiZvkPRA3rk7dN/shippi">Shipping & Delivery Policy</Link>
          </Box>
        </Box>

        {/* box-4  */}
        <Box className="box4">
          <Text>Follow us on social media</Text>
          <Box display={"flex"} gap={"15px"}>
            <Link to={"https://youtube.com/@DefencePost?si=cIb9_o8vNoCcfkwn"} target="_blank">
              <BiLogoYoutube size={"30px"} />
            </Link>
            <Link to={"https://instagram.com/defence.post?igshid=MzMyNGUyNmU2YQ=="} target="_blank">
              <BiLogoInstagramAlt size={"30px"} />
            </Link>
            <Link to={"https://t.me/DefencePost"} target="_blank">
              <BiLogoTelegram size={"30px"} />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box className="downFooter">
        <Text fontSize={"20px"} fontWeight={"bold"}>
          © all rights are reserved!
        </Text>
      </Box>
      {/* <div class="star" style={{ top: "20%", left: "10%" }}></div>
      <div class="star" style={{ top: " 50%", left: "30%" }}></div>
      <div class="star" style={{ top: " 70%", left: "70%" }}></div>
      <div class="star" style={{ top: " 90%", left: "90%" }}></div>
      <div class="star" style={{ top: " 20%", left: "20%" }}></div>
      <div class="star" style={{ top: " 80%", left: "20%" }}></div>
      <div class="star" style={{ top: " 10%", left: "75%" }}></div>
      <div class="star" style={{ top: " 50%", left: "5%" }}></div>
      <div class="star" style={{ top: " 50%", left: "50%" }}></div>
      <div class="star" style={{ top: " 50%", left: "95%" }}></div>
      <div class="star" style={{ top: " 50%", left: "80%" }}></div>
      <div class="star" style={{ top: " 10%", left: "45%" }}></div>
      <div class="star" style={{ top: " 94%", left: "50%" }}></div>
      <div class="star" style={{ top: " 5%", left: "5%" }}></div>
      <div class="star" style={{ top: " 90%", left: "5%" }}></div> */}
    </Box>
  );
}

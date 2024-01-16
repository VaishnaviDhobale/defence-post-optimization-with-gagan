import { Box, Text, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import {AiOutlineLeft} from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { baseUrl } from "../BaseUrl";


export function Login() {
  const navigate = useNavigate();
  let [showPass, setShowPass] = useState(false);
  let [userData, setUserData] = useState({});
  const toast = useToast();

  async function loginPostUser(){
    try{
      const loginData = await axios.post(`${baseUrl}/user/login`, userData);
      if (loginData?.status === 200 && loginData?.data?.msg) {
        toast({
          title: "Login successful",
          description: "Have a great day",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });

        let obj = {token : loginData.data.token, userName : loginData.data.name, email : userData.email}
        localStorage.setItem("DefencePostUserDetails", JSON.stringify(obj));
        navigate("/");

      } else {
        toast({
          title: "Check your credentials",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  }  

  // css starts
  const inputStyle = {
    border: "1.5px solid #29a4de",
    marginBottom: "40px",
    outline: "none",
    padding: "10px",
    width: "100%",
    fontSize: "17.5px",
    borderRadius : "10px",
    color : "#29a4de"
  };

  const button = {
    outline: "none",
    padding: "10px",
    width: "100%",
    backgroundColor: "#29a4de",
    cursor: "pointer",
    color: "white",
    fontSize: "17.5px",
  };
  // css ends

  // Login form functionality start
  const loginForm = (event) => {
    event.preventDefault();
    event.target.reset(); // This will reset all form fields  
    loginPostUser();
  };

  // handleling input here
  const handleInput = (event) => {
   let name = event.target.name;
   let value = event.target.value;

   setUserData({...userData,[name] : value});
  };

  return (
    <>
    <Navbar />

      <Text
        textAlign={{
          base : "Center",
          lg : "left"
        }}
        marginLeft={{
          base : "0",
          lg: "50px"
        }}
        marginBottom={"20px"}
        fontSize={"20px"}
        color={"#27395F"}
        cursor={"Pointer"}
        display={{base : "none",md :"flex"}}
        fontFamily={"Barlow"}
      >
        <AiOutlineLeft style={{position : "relative", top : "6px",fontSize : "17px"}} />
        <Link to="/">Back</Link>
      </Text>
      <Box
        width={{
          base: "100%",
          md: "50%",
          lg: "40%",
        }}
        margin={"auto"}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        padding={"30px"}
        marginBottom={"100px"}
        borderRadius={"20px"}
        position={"relative"}
        fontFamily={"Barlow"}
      >
        <Text fontSize={"30px"} fontWeight={"Bold"} marginBottom={"30px"}>
          Login
        </Text>

        {/* Login form  */}
        <form onSubmit={loginForm} style={{textAlign :"left"}}>
          <label htmlFor="" style={{alignItems : "left", fontSize : "20px",marginLeft:"2px"}}>Email</label>
          <input
            style={inputStyle}
            placeholder="Email or Phone Number"
            onChange={handleInput}
            name="email"
          />

          <label htmlFor="" style={{alignItems : "left", fontSize : "20px",marginLeft:"2px"}}>Password</label>
          <input
            type={showPass ? "password" : "text"}
            style={inputStyle}
            placeholder="Password"
            onChange={handleInput}
            name="password"
          />

          {/* Forget password start */}
          <Box textAlign={"right"} paddingBottom={"10px"}>
            <Link to={"/forgotpassword"} style={{ textDecoration: "underline", fontSize: "17.5px" }}>
              Forget Password?
            </Link>
          </Box>
          {/* Forget password ends  */}

          <input style={button} type="submit" value={"Login"} />
        </form>

        {/* Don't have account start  */}
        <Text fontSize={"17.5px"} marginTop={"20px"}>
          Don't have account?{" "}
          <Link
            style={{
              textDecoration: "underline",
              color: "#27395F",
            }}
            to={"/signup"}
          >
            Sign Up
          </Link>
        </Text>

        <Box
          fontSize={"25px"}
          position={"absolute"}
          right={"40px"}
          top={"266px"}
          cursor={"pointer"}
        >
          {showPass ? (
            <AiFillEye
              onClick={() => {
                setShowPass(false);
              }}
            />
          ) : (
            <AiFillEyeInvisible
              onClick={() => {
                setShowPass(true);
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

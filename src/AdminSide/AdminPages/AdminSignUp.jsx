import { Box, Text,useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link,useNavigate} from "react-router-dom";

import { AiOutlineLeft } from "react-icons/ai";
import { AdminNavbar } from "../adminComponents/AdminNavbar";
import axios from "axios";
import { AlertCompo } from "../../components/AlertCompo";
import { baseUrl } from "../../BaseUrl";


export function AdminSignUp() {
  const navigate = useNavigate();
  const toast = useToast();


  // let baseUrl = "https://breakable-dirndl-yak.cyclic.cloud/";
  // let baseUrl = "https://backend.defencepost.in";

  //  below useState for show or hide password
  let [showPass, setShowPass] = useState(false);

  let [showConfirmPass, setShowConfirmPass] = useState(false);

  // This state for a accept user details
  let [userData, setUserData] = useState({});
  let [err, setErr] = useState("");
  let [confirmErr, setConfirmErr] = useState("");

  // All user Data from backend to check user is alredy sign in or not
  let [allUserData,setAllUserData] = useState([]);
  let [alredyUser,setAlredyUser] = useState("notPresent")
  // css starts

  // adding user 
  async function addData(){
    try{
     let res = await axios.post(`${baseUrl}/admin/add`,userData);
     if(res.status==200 ){
      toast({
        title: res.data.msg,
        description: "Have a great day",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      // window.location.reload();
      navigate("/login")
     }else{
      alert("Something went wrong please try again")
     }
    


    }catch(err){
      alert(err)
    }
  }
  const inputStyle = {
    border: "1.5px solid #00ACEE",
    marginBottom: "20px",
    marginTop: "7px",
    outline: "none",
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "10px",
    color: "#00ACEE",
  };

  const button = {
    outline: "none",
    padding: "10px",
    width: "100%",
    backgroundColor: "#00ACEE",
    cursor: "pointer",
    color: "white",
    fontSize: "17.5px",
  };

  const StrongPass = {
    color: "gray",
  };
  // css ends

  // Singup form functionality start
  const singupForm = (event) => {
    event.preventDefault();
   
    // Password length validation
  setErr((prevErr) => (userData.password.length >= 6 ? "noErr" : "err"));

  // Password match validation
  setConfirmErr((prevConfirmErr) =>
    userData.password === userData.confirmPass ? "noErr" : "err"
  );

  // Check if the user is already registered
  const isUserAlreadyPresent = allUserData.some(
    (data) => data.email === userData.email
  );

  if (isUserAlreadyPresent) {
    setAlredyUser("present");
    return;
  } else {
    setAlredyUser("notPresent");
  }

  // If all validations pass, proceed with registration
  if (err === "noErr" && confirmErr === "noErr" && alredyUser === "notPresent") {
    addData();
  }

    
  };

  // handleling input here
  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // getting data from server to check user alredy registered or not 
  async function getData(){
    let data = await axios.get(`${baseUrl}/admin/`);
    setAllUserData(data.data)
  }

  // here iis a useEffect to call a getData function whwnever needed
  useEffect(()=>{
    getData()
  },[userData]);

  return (
    <>
    <AdminNavbar />

      <Text
        textAlign={{
          base: "Center",
          lg: "left",
        }}
        marginLeft={{
          base: "0",
          lg: "50px",
        }}
        marginBottom={"20px"}
        fontSize={"20px"}
        color={"#27395F"}
        cursor={"Pointer"}
        display={{base : "none",md : "flex"}}
      >
        <AiOutlineLeft
          style={{ position: "relative", top: "6px", fontSize: "17px" }}
        />
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
      >
        <Text fontSize={"30px"} fontWeight={"Bold"} marginBottom={"30px"}>
          Personal Details
        </Text>
        <form onSubmit={singupForm} style={{ textAlign: "left" }}>
          <label
            htmlFor=""
            style={{ alignItems: "left", fontSize: "20px", marginLeft: "2px" }}
          >
            Full Name*
          </label>
          <input
            required
            style={inputStyle}
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={handleInput}
          />
          <label
            htmlFor=""
            style={{ alignItems: "left", fontSize: "20px", marginLeft: "2px" }}
          >
            Phone Number*
          </label>
          <input
            type="phone"
            required
            style={inputStyle}
            placeholder="Phone Number"
            onChange={handleInput}
            name="contact"
          />

          <label
            htmlFor=""
            style={{ alignItems: "left", fontSize: "20px", marginLeft: "2px" }}
          >
            Email*
          </label>

          <input
            required
            style={inputStyle}
            placeholder="Email"
            onChange={handleInput}
            name="email"
          />

          <label
            htmlFor=""
            style={{ alignItems: "left", fontSize: "20px", marginLeft: "2px" }}
          >
            Password*
          </label>

          <input
            type={showPass ? "password" : "text"}
            style={inputStyle}
            placeholder="Password"
            required
            name="password"
            onChange={handleInput}
          />

          <label
            htmlFor=""
            style={{ alignItems: "left", fontSize: "20px", marginLeft: "2px" }}
          >
            Confirm Password*
          </label>

          <input
            type={showConfirmPass ? "password" : "text"}
            style={inputStyle}
            placeholder="Confirm Password"
            required
            name="confirmPass"
            onChange={handleInput}
          />

          <input style={button} type="submit" value={"Sign Up"} />
        </form>
        <Text fontSize={"17.5px"} marginTop={"20px"}>
          Already have account?{" "}
          <Link
            style={{
              textDecoration: "underline",
              color: "#27395F",
            }}
            to={"/login"}
          >
            Login
          </Link>
        </Text>

        {/*Show and hode password start  */}
        <Box
          fontSize={"25px"}
          position={"absolute"}
          right={"40px"}
          top={"465px"}
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
        {/* show and hide password end  */}

        {/*Show and hode confirm password start  */}
        <Box
          fontSize={"25px"}
          position={"absolute"}
          right={"40px"}
          top={"570px"}
          cursor={"pointer"}
        >
          {showConfirmPass ? (
            <AiFillEye
              onClick={() => {
                setShowConfirmPass(false);
              }}
            />
          ) : (
            <AiFillEyeInvisible
              onClick={() => {
                setShowConfirmPass(true);
              }}
            />
          )}
        </Box>
        {/* show and hide confirm password end  */}

        {/* Alert box  */}
        {alredyUser=="present" ? <AlertCompo
            data={{
              type: "error",
              msg: "You are alredy our user please go to login",
            }}
          />:
        err == "err" ? (
          <AlertCompo
            data={{
              type: "error",
              msg: "Password should have a minimum 6 digit",
            }}
          />
        ) : confirmErr == "err" ? (
          <AlertCompo
            data={{
              type: "error",
              msg: "Password or Confirm password should be match",
            }}
          />
        ) : null}
      </Box>
    </>
  );
}

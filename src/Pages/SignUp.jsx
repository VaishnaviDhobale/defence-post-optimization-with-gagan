import { Box, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AlertCompo } from "../components/AlertCompo";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { baseUrl } from "../BaseUrl";

export function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();

  //  below useState for show or hide password
  let [showPass, setShowPass] = useState(false);
  let [showConfirmPass, setShowConfirmPass] = useState(false);
  let [disableSignUp,setDisableSignUp]=useState(false)

  // This state for accepting user details
  let [userData, setUserData] = useState({});
  let [allBlockUsers, setAllBlockUsers] = useState([]);
  let [err, setErr] = useState("");
  let [confirmErr, setConfirmErr] = useState("");
  let [allUserData, setAllUserData] = useState([]);
  let [alredyUser, setAlredyUser] = useState("notPresent");
  let [isUserBlocked, setIsUserBlocked] = useState("notBlocked");

  // css starts

  // adding user
  const addData = async () => {
    setDisableSignUp(true)
    try {
      let res = await axios.post(`${baseUrl}/user/add`, userData);
      if (res?.status === 200) {
        toast({
          title: res.data.msg,
          description: "Have a great day",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } else {
        alert("Something went wrong, please try again");
      }
    } catch (err) {
      alert(err);
    }
    navigate("/login");
  };
  
  const inputStyle = {
    border: "1.5px solid #29a4de",
    marginBottom: "20px",
    marginTop: "7px",
    outline: "none",
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "10px",
    color: "#29a4de",
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

  const StrongPass = {
    color: "gray",
  };

  // css ends

  // Signup form functionality start
  const signUpForm = (event) => {
    event.preventDefault();

    // Password length validation
    setErr((prevErr) => (userData?.password?.length >= 6 ? "noErr" : "err"));

    // Password match validation
    setConfirmErr((prevConfirmErr) =>
      userData.password === userData?.confirmPass ? "noErr" : "err"
    );

    // Check if the user is already registered
    const isUserAlreadyPresent = allUserData?.some(
      (data) => data?.email === userData?.email
    );

    if (isUserAlreadyPresent) {
      setAlredyUser("present");
      return;
    } else {
      setAlredyUser("notPresent");
    }

    // check if the user is blocked
    const allBlockUser = allBlockUsers?.some(
      (data) =>
        data?.email === userData?.email || data?.contact === userData?.contact
    );
    if (allBlockUser) {
      setIsUserBlocked("blocked");
      return;
    } else {
      setIsUserBlocked("notBlocked");
    }

    // If all validations pass, proceed with registration
    if (
      err === "noErr" &&
      confirmErr === "noErr" &&
      alredyUser === "notPresent" &&
      isUserBlocked === "notBlocked"
    ) {
      addData();
    }
  };

  // Handling input here
  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // Getting data from the server to check if the user is already registered
  async function getAllUserData() {
    let data = await axios.get(`${baseUrl}/user/`);
    setAllUserData(data?.data);
  }

  // Getting all blocked user data
  async function getAllBlockUserData() {
    try {
      let blockUsers = await axios.get(`${baseUrl}/block/`);
      setAllBlockUsers(blockUsers?.data);
    } catch (err) {
      alert(err);
    }
  }

  // useEffect to call getData function whenever needed
  useEffect(() => {
    sessionStorage.setItem("prevPage", null);
    getAllUserData();
    getAllBlockUserData();
  }, []);

  return (
    <>
      <Navbar />

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
        display={{ base: "none", md: "flex" }}
        fontFamily={"Barlow"}
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
        fontFamily={"Barlow"}
      >
        <Text fontSize={"30px"} fontWeight={"Bold"} marginBottom={"30px"}>
          Personal Details
        </Text>
        <form onSubmit={signUpForm} style={{ textAlign: "left" }}>
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

          {/* <input style={button} type="submit" value={"Sign Up"} /> */}
          <button onClick={signUpForm} disabled={disableSignUp} style={button}>Sign Up</button>
        </form>

        <Text fontSize={"17.5px"} marginTop={"20px"}>
          Already have an account?{" "}
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

        {/*Show and hide password start  */}
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

        {/*Show and hide confirm password start  */}
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
        {isUserBlocked === "blocked" ? (
          <AlertCompo
            data={{
              type: "error",
              msg: "You are blocked",
            }}
          />
        ) : alredyUser === "present" ? (
          <AlertCompo
            data={{
              type: "error",
              msg: "You are already our user. Please go to login.",
            }}
          />
        ) : err === "err" ? (
          <AlertCompo
            data={{
              type: "error",
              msg: "Password should have a minimum of 6 characters.",
            }}
          />
        ) : confirmErr === "err" ? (
          <AlertCompo
            data={{
              type: "error",
              msg: "Password and Confirm password should match.",
            }}
          />
        ) : null}
      </Box>
    </>
  );
}

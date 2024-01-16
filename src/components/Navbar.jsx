import { NavLink, useNavigate } from "react-router-dom";
import { Box, Image, Select, Input, Button, Text } from "@chakra-ui/react";
import logoImg from "../Images/Logo-black.jpeg";
// import { VscThreeBars } from "react-icons/vsc";
import { IoReorderThreeOutline } from "react-icons/io5";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { IoMdLogOut } from "react-icons/io";
import "../css/navbar.css";
import "animate.css/animate.min.css";
import { VscThreeBars } from "react-icons/vsc";

// import for Drawer
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AlertBox } from "./AlertBox";
import { baseUrl } from "../BaseUrl";

// import "../css/navbar.css";

export function Navbar() {
const navigate = useNavigate();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [showPostDropdown, setShowPostDropdown] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [isHovered, setIsHovered] = useState(true);

  // logout
  let [showLogout, setShowLogout] = useState(false);
  let [token, setToken] = useState(
    JSON.parse(localStorage.getItem("DefencePostUserDetails"))?.token
  );
  let [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("DefencePostUserDetails"))?.userName
  );
  let [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("DefencePostUserDetails"))?.email
  );

  const handlePostMouseEnter = () => {
    setShowPostDropdown(true);
  };

  const handlePostMouseLeave = () => {
    setShowPostDropdown(false);
  };

  // Course dropdown handle
  const handleCourseMouseEnter = () => {
    setShowCourseDropdown(true);
  };

  const handleCourseMouseLeave = () => {
    setShowCourseDropdown(false);
  };

  // get all course data
  let getCourseData = async () => {
    try {
      let dataCourse = await axios.get(`${baseUrl}/course/`);
      setCourseData(dataCourse.data);
    } catch (err) {
      alert(err);
    }
  };

  // get all course data
  let getPostData = async () => {
    try {
      let dataPost = await axios.get(`${baseUrl}/post/`);
      
      // Extract unique categories using Set
      const uniqueCategories = [...new Set(dataPost.data.map(post => post.category))];
  
      // Set the unique categories in your state or wherever needed
      setPostData(uniqueCategories);
    } catch (err) {
      alert(err);
    }
  };
  

  // handle logout
  let handleLogout = () => {
    const userResponse = window.confirm("Are you sure you want to logout?");
    let obj = { token: null, userName: null, email: null };
    if (userResponse) {
      localStorage.setItem("DefencePostUserDetails", JSON.stringify(obj));
      navigate("/")
    }
  };

  useEffect(() => {
    getPostData();
    getCourseData();
  }, []);
  // console.log(postData);
  return (
    <>
      <Box
        className="header"
        display={{
          base: "none",
          lg: "grid",
        }}
        gridTemplateColumns={token ? "30% 1fr" : "30% 1fr 10%"}
        alignItems={"center"}
        backgroundColor={"white"}
        color={"black"}
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
        }
        fontFamily={"Barlow"}
        height={"70px"}
        position={"sticky"}
        top={"0px"}
        marginBottom={"50px"}
        zIndex={1000}
        paddingRight={"30px"}
      >
        <NavLink className="logo nav-link" to={"/"}>
          <Image src={logoImg} width={"200px"} height={"100%"}></Image>
        </NavLink>

        <Box
          className="nav"
          display={"flex"}
          justifyContent={"flex-end"}
          fontSize={"18px"}
          alignItems={"center"}
        >
          <NavLink className="navContent nav-link" to="/">
            Home
          </NavLink>
          <Box
            display={"flex"}
            className="navContent"
            // border={"1px solid red"}
            // paddingBottom={"2px"}
            onMouseEnter={handlePostMouseEnter}
            onMouseLeave={handlePostMouseLeave}
          >
            <NavLink className="nav-link" to="/posts">
              Posts
            </NavLink>{" "}
            <ChevronDownIcon
              style={{ position: "relative", top: "5px", marginLeft: "5px" }}
            />
            {showPostDropdown && (
              <Box
                className={`dropdown ${
                  isHovered ? "animate_animated animate_zoomIn" : ""
                }`}
                position={"absolute"}
                top={"45px"}
                display={"flex"}
                flexDirection={"column"}
                backgroundColor={"white"}
                textAlign={"left"}
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                padding={"10px 20px"}
                borderRadius={"10px"}
              >
                {postData.map((ele, index) => {
                  return (
                    <NavLink to={`/singlepostpage/${ele._id}/${index}`}>
                      {ele}
                    </NavLink>
                  );
                })}
              </Box>
            )}
          </Box>

          <Box
            display={"flex"}
            className="navContent"
            onMouseEnter={handleCourseMouseEnter}
            onMouseLeave={handleCourseMouseLeave}
          >
            <NavLink to="/course" className={"nav-link"}>
              Course
            </NavLink>{" "}
            <ChevronDownIcon
              style={{ position: "relative", top: "5px", marginLeft: "5px" }}
            />
            {showCourseDropdown && (
              <Box
                className={`dropdown ${
                  isHovered ? "animate_animated animate_zoomIn" : ""
                }`}
                position={"absolute"}
                top={"45px"}
                display={"flex"}
                flexDirection={"column"}
                backgroundColor={"white"}
                textAlign={"left"}
                padding={"10px 20px"}
                borderRadius={"10px"}
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
              >
                {showCourseDropdown &&
                  courseData.map((ele, index) => {
                    return (
                      <NavLink
                        to={`/viewdetails/${ele._id}`}
                        className={"nav-link"}
                      >
                        {ele.name}
                      </NavLink>
                    );
                  })}
              </Box>
            )}
          </Box>
          {token && (
            <NavLink className="navContent nav-link" to="/mycourse">
              My Course
            </NavLink>
          )}

          <NavLink className="navContent nav-link" to="/free">
            Free
          </NavLink>

          {/* Data */}
          {email == "masaieducation17@gmail.com" && (
            <NavLink className="navContent nav-link" to={"/datahub"}>
              DataHub
            </NavLink>
          )}

          {!token && (
            <NavLink className="navContent nav-link" to="/login">
              Login
            </NavLink>
          )}
          {token && (
            <Text
              backgroundColor={"green.300"}
              borderRadius={"50%"}
              width={"40px"}
              h={"40px"}
              // marginRight={"20px"}
              color={"white"}
              ml={"20px"}
              cursor={"pointer"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={() => {
                setShowLogout(!showLogout);
              }}
            >
              {userName[0]}
            </Text>
          )}
        </Box>
        <Box display={"flex"} gap={"10px"}>
          {!token && (
            <NavLink
              className="navContent"
              style={{ marginLeft: "0px" }}
              to="/signup"
            >
              <Button
                marginLeft={"30px"}
                backgroundColor={"#28a4de"}
                color={"white"}
                fontWeight={"500"}
              >
                Sign Up
              </Button>
            </NavLink>
          )}

          {showLogout && (
            <Box
              boxShadow={
                " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
              }
              position={"absolute"}
              top={"75px"}
              right={"20px"}
              padding={"10px 40px"}
              backgroundColor={"white"}
            >
              <Text fontSize={"15px"}>{email}</Text>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={"10px"}
                fontSize={"20px"}
                cursor={"pointer"}
                onClick={handleLogout}
              >
                <Text>Logout</Text>
                <IoMdLogOut color="red" />
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* responsive navbar  */}
      <Box
        display={{
          base: "flex",
          lg: "none",
        }}
        justifyContent={"space-between"}
        // backgroundColor={"#27395F"}
        color={"#28a4de"}
        marginBottom={"50px"}
        marginTop={"10px"}
        boxShadow={"rgba(17, 17, 26, 0.1) 0px 1px 0px"}
      >
        <Image src={logoImg} width={"180px"}></Image>
        <Box className="ThreeLines" cursor={"pointer"}>
          <VscThreeBars
            style={{ height: "40px", width: "30px" }}
            onClick={() => {
              onToggle();
              isOpen;
            }}
          />
        </Box>
      </Box>

      {/* navbar Drawer/responsive code  */}
      <Drawer isOpen={isOpen} placement="right" onClose={() => {}}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={onClose} />

          <DrawerBody>
            <Box display={"grid"} gap={"15px"} fontSize={"20px"}>
              <Text fontSize={"14px"} textDecoration={"underline"}>{email}</Text>
              <NavLink className={"nav-link"} to="/" onClick={onClose}>
                Home
              </NavLink>
              <Box display={"flex"}>
                <NavLink to="/posts" className={"nav-link"}>
                  Posts
                </NavLink>{" "}
                {/* <ChevronDownIcon
                  style={{
                    position: "relative",
                    top: "5px",
                    marginLeft: "10px",
                  }}
                /> */}
              </Box>
              <Box display={"flex"}>
                <NavLink to="/course" className={"nav-link"}>
                  Course
                </NavLink>{" "}
                {/* <ChevronDownIcon
                  style={{
                    position: "relative",
                    top: "5px",
                    marginLeft: "5px",
                  }}
                /> */}
              </Box>
              {token && <NavLink to="/mycourse" onClick={onClose} className={"nav-link"}>
                My Course
              </NavLink>}
              <NavLink to="/free" onClick={onClose} className={"nav-link"}>
                Free Resources
              </NavLink>
              {token ? (
                <Text onClick={handleLogout} className={"nav-link"}>
                  Logout
                </Text>
              ) : (
                <NavLink to="/login" onClick={onClose} className={"nav-link"}>
                  Login
                </NavLink>
              )}

              <NavLink to="/signup" onClick={onClose} className={"nav-link"}>
                Sign Up
              </NavLink>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

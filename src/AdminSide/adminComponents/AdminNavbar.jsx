import { Link, useNavigate } from "react-router-dom";
import { Box, Image, Button, Text } from "@chakra-ui/react";
import logoImg from "../Images/Logo-black.jpeg";
import { IoReorderThreeOutline } from "react-icons/io5";

import "../css/navbar.css";

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
import { useEffect, useState } from "react";
export function AdminNavbar() {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("DefencePostAdminDetails"))?.token
  );
  const navigate = useNavigate();

  let handleAddLogout = () => {
    let obj = { token: null, adminName: null };
    const userResponse = window.confirm("Are you sure you want to logout?");
    if (userResponse) {
      sessionStorage.setItem("DefencePostAdminDetails", JSON.stringify(obj));
      navigate("/login")
    }
  };

  // console.log(token)
  return (
    <>
      <Box
        className="header"
        display={{
          base: "none",
          lg: "grid",
        }}
        gridTemplateColumns={"30% 1fr 12%"}
        alignItems={"center"}
        backgroundColor={"white"}
        color={"black"}
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
        }
        fontFamily={"sans-serif"}
        height={"70px"}
        position={"sticky"}
        top={"0px"}
        zIndex={1000}
        paddingRight={"30px"}
      >
        <Link className="logo" to={"/adminhome"}>
          <Image src={logoImg} width={"200px"} height={"100%"}></Image>
        </Link>

        <Box
          className="nav"
          display={"flex"}
          justifyContent={"flex-end"}
          fontSize={"18px"}
        >
          <Link className="navContent" to="/adminhome">
            Home
          </Link>
          <Link className="navContent" to="/adminpost">
            Posts
          </Link>
          <Link className="navContent" to="/admincourse">
            Course
          </Link>{" "}
          <Link className="navContent" to="/adminfree">
            Free
          </Link>
          <Link className="navContent" to="/coupon">
            Coupon
          </Link>
          {!token ? (
            <Link className="navContent" to="/login">
              Login
            </Link>
          ) : (
            <Text
              className="navContent"
              cursor={"pointer"}
              onClick={handleAddLogout}
            >
              Logout
            </Text>
          )}
        </Box>
        <Link
          className="navContent"
          style={{ marginLeft: "0px" }}
          to="/adminsignup"
        >
          <Button
            marginLeft={"30px"}
            backgroundColor={"#00ACEE"}
            color={"white"}
            fontWeight={"500"}
          >
            Add Admin
          </Button>
        </Link>
      </Box>

      {/* responsive navbar  */}
      <Box
        display={{
          base: "flex",
          lg: "none",
        }}
        justifyContent={"space-between"}
        boxShadow={"rgba(17, 17, 26, 0.1) 0px 1px 0px"}
        color={"#00ACEE"}
      >
        <Image src={logoImg} width={"180px"}></Image>
        <Box className="ThreeLines" cursor={"pointer"}>
          <IoReorderThreeOutline
            size={"40px"}
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
            <Box className="nav resNav" fontSize={"18px"}>
              <Box>
                <Link className="navContent" to="/adminhome">
                  Home
                </Link>
              </Box>
              <Box>
                <Link className="navContent" to="/adminpost">
                  Posts
                </Link>
              </Box>
              <Box>
                <Link className="navContent" to="/admincourse">
                  Course
                </Link>{" "}
              </Box>
              <Box>
                <Link className="navContent" to="/adminfree">
                  Free
                </Link>
              </Box>
              <Box>
                {" "}
                <Link className="navContent" to="/login">
                  Login
                </Link>
              </Box>
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

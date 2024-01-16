import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useToast,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { SingleReview } from "./SingleReview";
import { baseUrl } from "../../BaseUrl";

export function UserManagement() {
  // let baseUrl = "https://breakable-dirndl-yak.cyclic.cloud/";
  // let baseUrl = "https://backend.defencepost.in";

  let toast = useToast();

  // state for get and store data for perticular section
  let [allUserData, setAllUserData] = useState([]);
  let [allBlockedUserData, setAllBlockedUserData] = useState([]);
  let [allReviewData, setAllReviewData] = useState([]);
  let [selectedReviewData, setSelectedReviewData] = useState([]);
  let [allCourseData, setAllCourseData] = useState([]);

  // states for show side pericular section
  let [showUserData, setShowUserData] = useState(true);
  let [showBlockData, setShowBlockData] = useState(false);
  let [showReviewData, setShowReviewData] = useState(false);

  // get all user data
  async function getAllUserData() {
    try {
      let userData = await axios.get(`${baseUrl}/user/`);
      // console.log(userData);

      setAllUserData(userData.data);
    } catch (err) {
      alert(err);
    }
  }

  // get all block data
  async function getAllBlockedUserData() {
    try {
      let userData = await axios.get(`${baseUrl}/block/`);

      setAllBlockedUserData(userData.data);
    } catch (err) {
      alert(err);
    }
  }

  // get all review data
  async function getAllReviewData() {
    try {
      let reviewData = await axios.get(`${baseUrl}/review/`);
      setAllReviewData(reviewData.data);
      setSelectedReviewData(reviewData.data);
    } catch (err) {
      alert(err);
    }
  }

  // get all course data
  async function getAllCourseData() {
    try {
      let courseData = await axios.get(`${baseUrl}/course/`);
      setAllCourseData(courseData.data);
    } catch (err) {
      alert(err);
    }
  }

  // user management data handle start
  //delete user and Block
  async function deleteUser(user) {
    try {
      let deleteUser = await axios.delete(`${baseUrl}/user/delete/${user._id}`);
      if (deleteUser.status == 200) {
        let addToBlock = await axios.post(`${baseUrl}/block/add`, {
          ...user,
          userId: user._id,
        });
        if (addToBlock.status === 200) {
          toast({
            title: addToBlock.data.msg,
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          getAllUserData();
        } else {
          toast({
            title: "Something is wrong",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  // Handle block
  function handleBlock(user) {
    let userResponse = window.confirm("Are you sure you want to block user?");
    if (userResponse) {
      deleteUser(user);
    }
  }

  // handle search here
  function handleSearch(e) {
    let searchData = allUserData.filter((ele, index) => {
      return ele.email.toLowerCase() === e.target.value.toLowerCase();
    });
    console.log(searchData);
  }
  // user management data handle end

  // block user management data handle start
  //unblock user
  async function unblockUser(user) {
    try {
      let unblockUser = await axios.delete(
        `${baseUrl}/block/delete/${user._id}`
      );
      if (unblockUser.status === 200) {
        toast({
          title: unblockUser.data.msg,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        getAllBlockedUserData();
      } else {
        toast({
          title: "Something is wrong",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      alert(err);
    }
  }

  // Handle block
  function handleUnblock(user) {
    let userResponse = window.confirm("Are you sure you want to unblock user?");
    if (userResponse) {
      unblockUser(user);
    }
  }

  // handle search here
  function handleSearch(e) {
    let searchData = allBlockedUserData.filter((ele, index) => {
      return ele.email.toLowerCase() === e.target.value.toLowerCase();
    });
    console.log(searchData);
  }
  // block user management data handle end

  // Review management start from here
  function handleCourseForReview(e) {
    let value = e.target.value;
    if (value == "all") {
      setSelectedReviewData(
        allReviewData.map((ele, index) => {
          return ele;
        })
      );
    } else {
      setSelectedReviewData(
        allReviewData.filter((ele, index) => {
          return ele.courseId === value;
        })
      );
    }
  }
  // handle review delete
  async function handleReviewDelete(id) {
    try {
      let userResponse = window.confirm(
        "Are you sure you want to delete review"
      );
      let reviewDelete = await axios.delete(`${baseUrl}/review/delete/${id}`);
      if (userResponse) {
        if (reviewDelete.status === 200) {
          toast({
            title: reviewDelete.data.msg,
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          getAllReviewData();
          window.location.reload();
        } else {
          toast({
            title: "Something is wrong",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }
      }
    } catch (err) {
      alert(err);
    }
  }
  // Review management end

  useEffect(() => {
    getAllUserData();
    getAllBlockedUserData();
    getAllReviewData();
    getAllCourseData();
  }, []);
  console.log(selectedReviewData);

  return (
    <Box>
      <Box
        mt={"30px"}
        display={"flex"}
        justifyContent={"center"}
        position={"sticky"}
        top={"70px"}
        backgroundColor={"white"}
        zIndex={"1000"}
        padding={"10px"}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        mb={"50px"}
      >
        {showReviewData && (
          <Box
            with={"30%"}
            backgroundColor={"white"}
            zIndex={1000}
            position={"absolute"}
            left={"10px"}
          >
            <Select
              onChange={handleCourseForReview}
              h={"30px"}
              cursor={"pointer"}
            >
              <option value="all">Select Course</option>
              {allCourseData.map((ele, index) => {
                return <option value={ele._id}>{ele.name}</option>;
              })}
            </Select>
          </Box>
        )}
        <Button
          ml={"20px"}
          backgroundColor={"#00acee"}
          color={"white"}
          fontWeight={"500"}
          h={"30px"}
          onClick={() => {
            setShowBlockData(false);
            setShowReviewData(false);
            setShowUserData(!showUserData);
          }}
        >
          {showUserData ? " Hide User Management" : "User Management"}
        </Button>

        {/* blocked button  */}
        <Button
          ml={"20px"}
          backgroundColor={"#00acee"}
          color={"white"}
          fontWeight={"500"}
          h={"30px"}
          onClick={() => {
            setShowUserData(false);
            setShowReviewData(false);
            setShowBlockData(!showBlockData);
          }}
        >
          {showBlockData ? "Hide Blocked Users" : "Blocked Users"}
        </Button>

        {/* Review management button  */}
        <Button
          ml={"20px"}
          backgroundColor={"#00acee"}
          color={"white"}
          fontWeight={"500"}
          h={"30px"}
          onClick={() => {
            setShowUserData(false);
            setShowBlockData(false);
            setShowReviewData(!showReviewData);
          }}
        >
          {showReviewData ? "Hide Review Management" : "Review Management"}
        </Button>
      </Box>

      {/* User management table */}
      {showUserData && (
        <Box mt={"50px"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            padding={"0px 30px"}
            width={"84%"}
            m={"auto"}
          >
            <Input
              type="search"
              placeholder="Search by email"
              w={"40%"}
              mb={"30px"}
              onChange={handleSearch}
            />
            <Text
              backgroundColor={"green.600"}
              color={"white"}
              w={"40px"}
              h={"40px"}
              borderRadius={"50%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {allUserData.length}
            </Text>
          </Box>
          <Table variant="simple" width={"80%"} m={"auto"}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>User Id</Th>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allUserData.map((user, index) => (
                <Tr key={user.id}>
                  <Td>{index + 1}</Td>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      ml={2}
                      onClick={() => {
                        handleBlock(user);
                      }}
                    >
                      Block
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      {/* {!allUserData.length > 0 && showUserData && (
        <Box>You dont have users</Box>
      )} */}

      {/* handle block users structure  */}
      {showBlockData && (
        <Box mt={"50px"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            padding={"0px 30px"}
            width={"84%"}
            m={"auto"}
          >
            <Input
              type="search"
              placeholder="Search by email"
              w={"40%"}
              mb={"30px"}
              onChange={handleSearch}
            />
            <Text
              backgroundColor={"green.600"}
              color={"white"}
              w={"40px"}
              h={"40px"}
              borderRadius={"50%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {allBlockedUserData.length}
            </Text>
          </Box>
          <Table variant="simple" width={"80%"} m={"auto"}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>User Id</Th>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allBlockedUserData.map((user, index) => (
                <Tr key={user.id}>
                  <Td>{index + 1}</Td>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Button
                      colorScheme="green"
                      size="sm"
                      ml={2}
                      onClick={() => {
                        handleUnblock(user);
                      }}
                    >
                      Unblock
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Review management structure  */}
      {showReviewData && (
        <Box mt={"30px"}>
          <Box justifyItems={"start"} overflowY={"auto"}>
            {selectedReviewData.map((ele, index) => {
              return (
                <SingleReview
                  data={ele}
                  handleReviewDelete={handleReviewDelete}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

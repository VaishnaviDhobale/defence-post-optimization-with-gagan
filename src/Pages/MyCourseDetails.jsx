import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { FaUnlockAlt } from "react-icons/fa";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { Spinar } from "../components/Spinar";
import { BiHappy, BiSad } from "react-icons/bi";
import Rating from "react-rating-stars-component";
import PdfViewer from "../components/PdfViewer";
import { baseUrl } from "../BaseUrl";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export function MyCourseDetails() {
  const { id, courseId } = useParams();
  const token = JSON.parse(localStorage.getItem("DefencePostUserDetails"))?.token
  const headers = {
    'token': token, // Replace with your actual authorization token
    'Content-Type': 'application/json', // Adjust content type as needed
    // Add any other headers you need
  };

  let [singleMyCourseData, setSingleMyCourseData] = useState({});
  let [isLoading, setIsLoading] = useState(false);
  let [displayReviewButton, setDisplayReviewButton] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState("");
  // let { courseId } = useParams();
  let toast = useToast();
  const pdfUrl = "https://www.africau.edu/images/default/sample.pdf";
  const driveLik =
    "https://drive.google.com/file/d/1v5smo5mk6VrFMqpQvLvkpq3YR7AGz1Sn/view?usp=sharing";

  async function getMyCourseData() {
    try {
      setIsLoading(true);
      let myCourseData = await axios.get(`${baseUrl}/mycourse/${id}`, {headers});
      console.log(myCourseData.data.data);
      setSingleMyCourseData(myCourseData?.data?.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  let handlePostReview = (e) => {
    e.preventDefault();
    let userName = JSON.parse(
      localStorage.getItem("DefencePostUserDetails")
    )?.userName;
    let email = JSON.parse(
      localStorage.getItem("DefencePostUserDetails")
    )?.email;

    // console.log(email);
    const currentDate = new Date();
    // Format the date as desired (e.g., "MM/DD/YYYY HH:MM AM/PM")
    const formattedDate = `${currentDate?.toLocaleDateString()} ${currentDate?.toLocaleTimeString()}`;
    let userReviewData = {
      name: userName,
      review: reviewData,
      rating,
      date: formattedDate,
      courseId,
      email,
    };

    let postReviewData = async () => {
      try {
        let reviewData = await axios.post(
          `${baseUrl}/review/add`,
          userReviewData,

        );
        if (reviewData.status == 200) {
          toast({
            title: "Review Added",
            // description: "Have a great day",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          // getReviewData();

          // Reset form fields
          setRating(0);
          setReviewData("");

          setDisplayReviewButton(!displayReviewButton);
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
    };

    postReviewData();
  };

  function extractVideoId(url) {
    if (!url) {
      return null; // Return null or handle the case when the URL is undefined
    }

    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  }

  // Function to process each drive link removing last 16 charactor
  function removeLastCharacters(inputString, charactersToRemove) {
    // Check if the inputString is long enough to remove characters
    if (inputString.length <= charactersToRemove) {
      return ""; // or handle the case based on your requirements
    }

    // Use slice to get the substring excluding the last charactersToRemove
    const modifiedString = inputString?.slice(0, -charactersToRemove);

    return modifiedString;
  }

  useEffect(() => {
    getMyCourseData();
  }, []);

  console.log(singleMyCourseData);
  //   let data = singleMyCourseData.coursePDF;
  // console.log(removeLastCharacters(driveLik,16));

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Spinar />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Box>
        {/* <Text
          mb={"30px"}
          fontSize={"25px"}
          fontWeight={"bold"}
          textAlign={"left"}
          ml={"20px"}
          fontFamily={"Barlow"}
        >
          Start your study
        </Text> */}
        {/* <Box textAlign={"left"} ml={"20px "}>
          {singleMyCourseData?.folders?.map((ele, index) => {
            return (
              <Box>
                <Box
                  display={"flex"}
                  gap={"20px"}
                  alignItems={"center"}
                  marginBottom={"20px"}
                  position={"relative"}
                >
                  <FaFolder style={{ color: "red", fontSize: "40px" }} />
                  {ele?.name}
                  {ele?.contents?.map((content, index) => {
                    return <>{content?.coursePDFName}</>;
                  })}
                  <Link to={`/viewdetails/${data._id}`}>View Details</Link>
                  <Link
                    style={{ fontSize: "19px" }}
                    to={driveLik.includes("drive") ? `/previewPdf/${encodeURIComponent("https://drive.google.com/file/d/1v5smo5mk6VrFMqpQvLvkpq3YR7AGz1Sn/preview")}`: `/previewPdf/${encodeURIComponent(extractVideoId(singleMyCourseData?.coursePDF[index]))}`}
                    to={singleMyCourseData?.coursePDF[index].includes("drive") ? `/previewPdf/${encodeURIComponent(`${removeLastCharacters(singleMyCourseData?.coursePDF[index],16)}/preview`)}`: `/previewPdf/${encodeURIComponent(extractVideoId(singleMyCourseData?.coursePDF[index]))}`}
                  >
                    {singleMyCourseData?.coursePDFName[index]}
                  </Link>

                  <PdfViewer pdfLink = {"https://drive.google.com/file/d/1xj0veQMTERqh0XW2JP4qq09Jf0I0Rp0c/preview"} />
                  <PdfViewer link = {singleMyCourseData.coursePDFName[index]} />

                  <Text
                    fontSize={"20px"}
                    textAlign={"right"}
                    position={"absolute"}
                    right={"0px"}
                    color={"white"}
                    fontWeight={"bold"}
                    backgroundColor={"green"}
                    padding={"5px 10px"}
                    borderRadius={"10px"}
                    mr={"20px"}
                  >
                    <FaUnlockAlt />
                  </Text>
                </Box>
                <hr style={{ margin: "20px", marginLeft: "0px" }} />
              </Box>
            );
          })}
        </Box> */}
        <Box textAlign={"left"} ml={"20px "} fontFamily={"Barlow"} mt={"-49px"}>
          <Accordion allowToggle>
            {singleMyCourseData?.folders?.map((ele, eleIndex) => {
              return (
                <AccordionItem key={eleIndex}>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        display={"flex"}
                        gap={"20px"}
                        alignItems={"center"}
                        marginBottom={"20px"}
                        position={"relative"}
                      >
                        <FaFolder style={{ color: "#F8D775", fontSize: "40px" }} />
                        <Text fontSize={"20px"}> {ele?.name}</Text>
                        {/* <Text
                          fontSize={"20px"}
                          textAlign={"right"}
                          position={"absolute"}
                          right={"0px"}
                          color={"white"}
                          fontWeight={"bold"}
                          backgroundColor={"green"}
                          padding={"5px 10px"}
                          borderRadius={"10px"}
                          mr={"20px"}
                        >
                          <FaUnlockAlt />
                        </Text> */}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {ele?.contents?.map((content, index) => {
                      return (
                        <Box
                          display={"flex"}
                          gap={"20px"}
                          alignItems={"center"}
                          marginBottom={"20px"}
                          position={"relative"}
                          key={index}
                        >
                          <Link
                            style={{ fontSize: "19px" }}
                            // to={driveLik.includes("drive") ? `/previewPdf/${encodeURIComponent("https://drive.google.com/file/d/1v5smo5mk6VrFMqpQvLvkpq3YR7AGz1Sn/preview")}`: `/previewPdf/${encodeURIComponent(extractVideoId(singleMyCourseData?.coursePDF[index]))}`}
                            to={
                              content?.coursePDF?.includes("drive")
                                ? `/previewPdf/${encodeURIComponent(
                                    `${removeLastCharacters(
                                      content?.coursePDF,
                                      16
                                    )}/preview`
                                  )}`
                                : `/previewPdf/${encodeURIComponent(
                                    extractVideoId(content?.coursePDF)
                                  )}`
                            }
                          >
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                              <AiOutlineFilePdf
                                style={{ color: "red", fontSize: "40px",marginRight:"30px" }}
                              />
                              {content?.coursePDFName}
                            </Box>
                          </Link>
                          {/* <Link
                            style={{ fontSize: "19px" }}
                            // to={driveLik.includes("drive") ? `/previewPdf/${encodeURIComponent("https://drive.google.com/file/d/1v5smo5mk6VrFMqpQvLvkpq3YR7AGz1Sn/preview")}`: `/previewPdf/${encodeURIComponent(extractVideoId(singleMyCourseData?.coursePDF[index]))}`}
                            to={
                              content?.coursePDF?.includes("drive")
                                ? `/previewPdf/${content?.coursePDF}`
                                : `/previewPdf/${encodeURIComponent(
                                    extractVideoId(content?.coursePDF)
                                  )}`
                            }
                          >
                            <h1>
                              <AiOutlineFilePdf
                                style={{ color: "red", fontSize: "40px" }}
                              />
                              {content?.coursePDFName}
                            </h1>
                          </Link> */}
                        </Box>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Box>
        <Box>
          {/* add review button  */}
          {/* <Button
            onClick={() => {
              setDisplayReviewButton(true);
            }}
            mb={"40px"}
            bg={"#29a4de"}
            color={"white"}
            fontWeight={"500"}
            mt={"20px"}
          >
            {" "}
            Add Review
          </Button> */}

          {/* review form  */}
          {displayReviewButton && (
            <Box
              margin={"auto"}
              width={{ base: "100%", sm: "100%", md: "60%", lg: "40%" }}
              mb={"0p8x"}
            >
              <form onSubmit={handlePostReview}>
                {/* Star rating component */}
                <Box
                  textAlign={"left"}
                  boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                  padding={"20px"}
                  backgroundColor={"#e7e8ea"}
                  borderRadius={"10px"}
                >
                  <Text
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    marginBottom={"20px"}
                  >
                    Give Your Feedback
                  </Text>
                  <Box display={"flex"} gap={"20px"} alignItems={"center"}>
                    <Box>
                      <BiSad fontSize={"25px"} style={{ marginLeft: "3px" }} />
                      <Text>Poor</Text>
                    </Box>
                    <Box
                      // width={"250px"}
                      // m={"auto"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"20px"}
                      // border={"1px solid red"}
                    >
                      <Rating
                        count={5} // Number of stars
                        value={rating} // Current rating value
                        onChange={(newRating) => setRating(newRating)} // Handle rating change
                        size={45} // Size of the stars
                        activeColor="#daa520" // Color of the active (filled) stars
                        inactiveColor="#c0bebf" // Color of the inactive (empty) stars
                        fontSize="20px"
                      />
                    </Box>
                    <Box>
                      <BiHappy
                        fontSize={"25px"}
                        style={{ marginLeft: "3px" }}
                      />
                      <Text>Best</Text>
                    </Box>
                  </Box>
                </Box>

                {/* textarea  */}
                <Box
                  boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                  padding={"20px"}
                  borderRadius={"10px"}
                  mt={"15px"}
                  backgroundColor={"#e7e8ea"}
                >
                  <Text
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    textAlign={"left"}
                    // marginBottom={"20px"}
                  >
                    Write-Up
                  </Text>

                  <textarea
                    name=""
                    id=""
                    rows="3"
                    value={reviewData}
                    onChange={(e) => setReviewData(e.target.value)}
                    placeholder="Write your review..."
                    style={{
                      // border: "1px solid gray",
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                      outline: "none",
                      padding: "20px",
                      fontSize: "19px",
                      width: "100%",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                    required
                  ></textarea>
                </Box>
                <br />
                <input
                  type="submit"
                  value="Submit Feedback"
                  style={{
                    padding: "8px 20px",
                    backgroundColor: "#29a4de",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                    // marginTop: "10px",
                    marginBottom: "50px",
                  }}
                />
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

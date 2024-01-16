import {
  Box,
  Button,
  Text,
  useToast,
  Image,
  AccordionItem,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import Video from "../components/Video";
import { useEffect, useState } from "react";
import { ViewPdf } from "../components/ViewPdf";
import { ViewReview } from "../components/ViewReview";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BiHappy, BiSad, BiSolidLock } from "react-icons/bi";
import pdf from "../Images/mba.pdf";
import axios, { Axios } from "axios";
import Rating from "react-rating-stars-component";
import Img from "../Images/img.jpg";
import { Spinar } from "../components/Spinar";
const CryptoJS = require("crypto-js");
import { baseUrl } from "../BaseUrl";
import { RxCross2 } from "react-icons/rx";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaFolder, FaLock } from "react-icons/fa";

export function ViewDetails() {
  let token = JSON.parse(localStorage.getItem("DefencePostUserDetails"))?.token;
  let userName = JSON.parse(
    localStorage.getItem("DefencePostUserDetails")
  )?.userName;
  let email = JSON.parse(localStorage.getItem("DefencePostUserDetails"))?.email;

  const headers = {
    token: token, // Replace with your actual authorization token
    "Content-Type": "application/json", // Adjust content type as needed
    // Add any other headers you need
  };
  // css starts
  const inputStyle = {
    border: "1.5px solid #29a4de",
    marginBottom: "20px",
    outline: "none",
    padding: "10px",
    width: "100%",
    fontSize: "17.5px",
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
  // css ends
  const navigate = useNavigate();

  let toast = useToast();

  let [description, setDescription] = useState(true);
  let [preview, setPreview] = useState(false);
  let [review, setReview] = useState(false);
  let [singleCourseData, setSingleCourseData] = useState({});

  // hide and show add review button
  let [displayReviewButton, setDisplayReviewButton] = useState(false);

  // rating review
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState("");

  const [allReviewData, setAllReviewData] = useState([]);

  // coupon
  let [enableCouponFrame, setEnableCouponFrame] = useState(false);
  let [isCoupon, setIsCoupon] = useState(false);
  let [coupon, setCoupon] = useState("");
  let [allCouponData, setAllCouponData] = useState([]);
  let [buy, setBuy] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let isFound = false;

  let { courseId } = useParams();

  let getSingleCourseData = async () => {
    try {
      setIsLoading(true);
      let dataSingleCourse = await axios.get(`${baseUrl}/course/${courseId}`);
      setSingleCourseData(dataSingleCourse?.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  useEffect(() => {
    getSingleCourseData();
  }, [window.location.href]);

  // console.log(window.location.href);
  let handleReviewClick = () => {
    if (!JSON.parse(localStorage.getItem("DefencePostUserDetails"))?.token) {
      navigate("/login");
    }
    setDisplayReviewButton(!displayReviewButton);
  };

  let handlePostReview = (e) => {
    e.preventDefault();

    // console.log(email);
    const currentDate = new Date();
    // Format the date as desired (e.g., "MM/DD/YYYY HH:MM AM/PM")
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
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
          userReviewData
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
          getReviewData();

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

  let getReviewData = async () => {
    try {
      setIsLoading(true);
      let reviewsData = await axios.get(`${baseUrl}/review/`);
      let data = reviewsData?.data?.filter((ele, index) => {
        return ele?.courseId == courseId;
      });
      setAllReviewData(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  //rezorpay payment varification
  const verifyPayment = async (response) => {
    try {
      // Replace with your actual Razorpay key secret
      let keySecretData = await axios.get(`${baseUrl}/payment/getSecretKey`);
      // console.log(keySecretData.data)
      const keySecret = keySecretData?.data;

      // Concatenate the order ID, payment ID, and your secret key
      const message =
        response?.razorpay_order_id + "|" + response?.razorpay_payment_id;

      // Create HMAC using crypto-js
      const hmac = CryptoJS.HmacSHA256(message, keySecret);

      // Convert the result to a hexadecimal string
      const signature = CryptoJS.enc.Hex.stringify(hmac);

      // Verify the signature
      return signature === response?.razorpay_signature;
    } catch (err) {
      console.log(err);
    }
  };

  // Test rezorpay
  let checkoutHandler = async (discountPrice) => {
    if (!JSON.parse(localStorage.getItem("DefencePostUserDetails"))?.token) {
      navigate("/login");
    } else {
      try {
        let keyData = await axios.get(`${baseUrl}/payment/getKey`);
        // console.log(keyData.data);
        let data = await axios.post(`${baseUrl}/payment/checkout`, {
          amount: discountPrice || singleCourseData?.sellPrice,
        });

        const options = {
          key: keyData.data,
          amount: discountPrice || singleCourseData?.sellPrice,
          currency: "INR",
          name: "Defence Post",
          description: "Notes",
          image:
            "https://media.licdn.com/dms/image/D4D03AQFY0t-eh4N4UQ/profile-displayphoto-shrink_800_800/0/1696600343127?e=1709769600&v=beta&t=6WiaqygVjAbwnn4LeFF7mbv5q7TrZ8U2xR6dxJML2VI",
          order_id: data?.data?.order?.id,
          handler: function (response) {
            console.log(response);
            if (verifyPayment(response)) {
              // console.log(response);
              alert("Payment Successful!");
              addDetailAfterPayment(
                response,
                discountPrice || singleCourseData?.sellPrice,
                courseId
              );
              // updateting coupon thing
              {
                discountPrice &&
                  allCouponData.map(async (ele, index) => {
                    promotorAmount(
                      Number(singleCourseData?.sellPrice),
                      ele._id,
                      Number(ele.promoterAmount),
                      Number(ele.promoterCommission),
                      ele.studentsCount
                    );
                  });
              }
              assignCourseToUser();
              navigate("/mycourse");
            } else {
              console.error("Payment verification failed!");
              alert("Payment verification failed. Please try again");
            }
          },
          prefill: {
            name: "Gaurav Kumar",
            email: "gauravsmitawa@gmail.com",
            contact: "9671381579",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#489cdb",
          },
        };

        // console.log(options);

        const razor = new window.Razorpay(options);
        // console.log(razor);
        razor.open();
        return 1;
      } catch (err) {
        alert(err);
      }
    }
  };

  // I have to delete this function after testing and uncomment other onclick thing from buy course. this is post my course
  async function assignCourseToUser() {
    try {
      let myCourseDataObj = {
        CourseName: singleCourseData.name,
        title: singleCourseData.title,
        price: singleCourseData.price,
        discount: singleCourseData.discount,
        sellPrice: singleCourseData.sellPrice,
        thumbnail: singleCourseData.thumbnail,
        previewPDF: singleCourseData.previewPDF,
        previewPDFName: singleCourseData.previewPDFName,
        folders: singleCourseData.folders,
        // coursePDF: singleCourseData.coursePDF,
        // coursePDFName: singleCourseData.coursePDFName,
        courseId: singleCourseData._id,
      };
      // console.log(myCourseDataObj,"current course");
      let data = await axios.post(`${baseUrl}/mycourse/add`, myCourseDataObj, {
        headers,
      });
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  let addDetailAfterPayment = async (response, amount, courseId) => {
    // alert("data getting add")
    let detailsObj = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
      amount: amount,
      currency: response.currency,
      status: response.status,
      method: response.method,
      bank: response.bank,
      userName: userName,
      userEmailId: email,
      courseName: singleCourseData.name,
      courseId: courseId,
    };
    try {
      let data = await axios.post(`${baseUrl}/payment/addDetails`, {
        detailsObj,
      });
    } catch (err) {
      console.log(err);
    }
  };

  let getAllCouponData = async () => {
    try {
      setIsLoading(true);
      let coupanData = await axios.get(`${baseUrl}/coupon/`);
      setAllCouponData(coupanData?.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  // search coupon
  let SearchCoupon = () => {
    allCouponData.map(async (ele, index) => {
      if (ele.coupon == coupon) {
        let dis = (ele.studentDiscount / 100) * singleCourseData.sellPrice;
        // console.log(ele.studentsCount);
        let discountPrice = Number(singleCourseData.sellPrice) - dis;
        isFound = true;
        setEnableCouponFrame(false);

        // I have to update this on payment done.
        let data = await checkoutHandler(discountPrice);
        // if (data == 1) {
        //   promotorAmount(
        //     Number(singleCourseData.sellPrice),
        //     ele._id,
        //     Number(ele.promoterAmount),
        //     Number(ele.promoterCommission),
        //     ele.studentsCount
        //   );
        // }
      }
    });

    if (!isFound) {
      toast({
        title: "Please check your coupon",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };
  // update promotor amount function
  async function promotorAmount(
    amount,
    id,
    promoterAmount,
    promoterCommission,
    studentsCount
  ) {
    // alert("ok");
    console.log(amount, id, promoterAmount, promoterCommission, studentsCount);
    try {
      let test = {
        promoterAmount:
          Number(promoterAmount) + (promoterCommission / 100) * amount,
        studentsCount: studentsCount + 1,
      };

      // console.log(test,"Test")
      let data = await axios.patch(`${baseUrl}/coupon/patch/${id}`, test);
      // console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  async function getMyCourseData() {
    try {
      setIsLoading(true);
      let myCourseData = await axios.get(`${baseUrl}/mycourse/`, { headers });
      // console.log(myCourseData.data.data);
      let buyData = myCourseData?.data?.data?.some(
        (obj) => obj.courseId === courseId
      );
      buyData ? setBuy(true) : setBuy(false);
      // console.log(buyData,buy);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  function extractVideoId(url) {
    if (!url) {
      return null; // Return null or handle the case when the URL is undefined
    }

    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  }

  useEffect(() => {
    sessionStorage.setItem("prevPage", null);
    getReviewData();
    getAllCouponData();
    getMyCourseData();
  }, []);

  console.log(singleCourseData,"current")
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
      <Box position={"relative"} bottom={"50px"} fontFamily={"Barlow"}>
        <Box>
          <Box h={"500px"}>
            <iframe
              width="100%"
              height="65%"
              src={`https://www.youtube.com/embed/${extractVideoId(
                singleCourseData.introVideo
              )}`}
              title="YouTube video player"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </Box>
        </Box>
        <Image
          borderRadius={"5px"}
          position={"absolute"}
          w={{ base: "150px", sm: "320px" }}
          h={{ base: "100px", sm: "210px" }}
          top={{ base: "265px", sm: "210px" }}
          left={{
            base: "20px",
            sm: "60px",
          }}
          src={singleCourseData.thumbnail}
        ></Image>

        <Box position={"relative"} bottom={"60px"}>
          <Box textAlign={"right"} marginTop={"-50px"} marginRight={"10px"}>
            <Button
              backgroundColor={"#29a4de"}
              color={"white"}
              fontWeight={"500"}
              // onClick={tryToAddMyCourseData}
              isDisabled={buy}
              onClick={() => setEnableCouponFrame(!enableCouponFrame)}
            >
              {/* <Link>Buy Course</Link> */}
              {buy ? "Already Taken" : "Buy Course"}

              {/* <Link to={"/mycourse"}>{buy ? "Already Taken" : "Buy Course" }</Link> */}
            </Button>
            {enableCouponFrame && (
              <Box
                position={"absolute"}
                right={{ base: "10", md: "160px" }}
                top={{ base: "60px", md: "20px" }}
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                padding={"20px"}
                borderTopLeftRadius={"20px"}
                borderBottomLeftRadius={"20px"}
                borderBottomRightRadius={"20px"}
                backgroundColor={"white"}
                zIndex={1000}
              >
                <Text
                  onClick={() => {
                    setEnableCouponFrame(false);
                  }}
                  mb={"15px"}
                  cursor={"pointer"}
                  textAlign={"right"}
                  position={"relative"}
                >
                  <RxCross2
                    style={{
                      position: "absolute",
                      right: "-15px",
                      top: "-15px",
                      color: "white",
                      backgroundColor: "red",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      padding: "2px",
                      fontSize: "20px",
                    }}
                  />
                </Text>
                <Box width={"250px"} textAlign={"center"}>
                  <Box
                    display={isCoupon ? "block" : "flex"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                  >
                    {isCoupon ? (
                      <input
                        required
                        type="text"
                        placeholder="Coupon"
                        style={inputStyle}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                        }}
                      />
                    ) : (
                      <Text
                        fontSize={"25px"}
                        fontWeight={"bold"}
                        color={"green"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <BsCurrencyRupee
                          style={{
                            color: "green.300",
                            fontSize: "21px",
                            position: "relative",
                            top: "1px",
                          }}
                        />{" "}
                        {singleCourseData.sellPrice}
                      </Text>
                    )}
                    {!isCoupon && (
                      <Button
                        backgroundColor={"#29a4de"}
                        color={"white"}
                        fontWeight={"500"}
                        onClick={() => {
                          setEnableCouponFrame(false);
                          checkoutHandler();
                        }}
                      >
                        Continue
                      </Button>
                    )}
                    {isCoupon && (
                      <Button
                        backgroundColor={"#29a4de"}
                        color={"white"}
                        fontWeight={"500"}
                        onClick={SearchCoupon}
                      >
                        Add Coupon
                      </Button>
                    )}
                  </Box>
                  <Box mt={"15px"}>
                    <Text>
                      {isCoupon ? "Don't have coupon?" : " Do you have coupon?"}
                      <span
                        style={{
                          color: "blue",
                          fontSize: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setIsCoupon(!isCoupon);
                        }}
                      >
                        {" "}
                        Click Here
                      </span>
                    </Text>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box margin={{ base: "20px 20px", sm: "30px 60px" }}>
            {/* Name  */}
            <Box textAlign={"left"}>
              <Text fontWeight={"bold"} fontSize={"30px"}>
                {singleCourseData.title}
              </Text>

              {/* Price starts */}
              <Box display={"flex"} marginTop={"10px"} alignItems={"center"}>
                <Text fontSize={"27px"}>
                  <span
                    style={{
                      fontSize: "16px",
                      position: "relative",
                      bottom: "5px",
                    }}
                  >
                    ₹
                  </span>
                  {singleCourseData.sellPrice} {/* //price */}
                </Text>
                <Text color={"Gray"} marginLeft={"10px"}>
                  <del>₹{singleCourseData.price}</del> {/* //old price */}
                </Text>
                <Text marginLeft={"10px"} color={"green"}>
                  ( {singleCourseData.discount}% OFF )
                </Text>
              </Box>
              {/* Price ends */}
            </Box>

            {/* View Navbar  */}
            <Box
              textAlign={"left"}
              marginTop={"25px"}
              //   border={"1px solid red"}
              width={{
                base: "100%",
                lg: "25%",
              }}
              display={"flex"}
              justifyContent={"space-between"}
              paddingBottom={"10px"}
              className="view"
              fontWeight={"bold"}
              fontSize={"20px"}
              gap={{ sm: "40px", sm: "50px" }}
            >
              <Text
                onClick={() => {
                  setDescription(true);
                  setReview(false);
                  setPreview(false);
                }}
              >
                <Text color={description ? "#29a4de" : "black"}>
                  Description
                </Text>
              </Text>
              <Text
                color={preview ? "#29a4de" : "black"}
                onClick={() => {
                  setPreview(true);
                  setReview(false);
                  setDescription(false);
                }}
              >
                Preview
              </Text>
              <Text
                color={review ? "#29a4de" : "black"}
                onClick={() => {
                  setReview(true);
                  setDescription(false);
                  setPreview(false);
                }}
              >
                Feedback
              </Text>
            </Box>
            <hr style={{ marginBottom: "40px" }} />

            <Box marginBottom={"50px"}>
              {description && (
                <Box>
                  {" "}
                  <Text fontSize={"35px"} fontWeight={"bold"}>
                    {" "}
                    Description
                  </Text>
                  <Text textAlign={"left"} marginTop={"20px"}>
                    {singleCourseData.description}
                  </Text>
                </Box>
              )}

              {preview && (
                <Box>
                  {singleCourseData?.previewPDF?.map((ele, index) => {
                    return (
                      <ViewPdf
                        link={ele}
                        name={singleCourseData.name}
                        tag="free"
                        courseName={singleCourseData.previewPDFName[index]}
                      />
                    );
                  })}

                  {/* This is for paid  */}
                  <Link to={buy && `/mycourse`}>
                  <Box mt={"-21px"}>
                    <Accordion allowToggle>
                      {singleCourseData?.folders?.map((ele, eleIndex) => {
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
                                  borderBottom="none"
                                >
                                  <FaFolder
                                    style={{
                                      color: "#F8D775",
                                      fontSize: "40px",
                                    }}
                                  />
                                  <Text fontSize={"20px"}> {ele?.name}</Text>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              {ele?.contents?.map((content, index) => {
                                return (
                                  <Box
                                    // display={"flex"}
                                    gap={"20px"}
                                    alignItems={"center"}
                                    marginBottom={"20px"}
                                    position={"relative"}
                                    key={index}
                                  >
                                    <ViewPdf
                                      link={ele}
                                      name={singleCourseData.name}
                                      tag="paid"
                                      courseName={content?.coursePDFName}
                                    />
                                  </Box>
                                );
                              })}
                            </AccordionPanel>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </Box>
                  </Link>
                </Box>
              )}

              {review && (
                <Box>
                  <Button
                    marginBottom={"30px"}
                    backgroundColor={"#29a4de"}
                    color={"white"}
                    fontWeight={"500"}
                    onClick={handleReviewClick}
                  >
                    {displayReviewButton ? "Hide Feedback" : "Add Feedback"}
                  </Button>
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
                          <Box
                            display={"flex"}
                            gap={"20px"}
                            alignItems={"center"}
                          >
                            <Box>
                              <BiSad
                                fontSize={"25px"}
                                style={{ marginLeft: "3px" }}
                              />
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
                  <Box>
                    {allReviewData.reverse().map((ele, index) => {
                      return <ViewReview data={ele} />;
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import { Box, Button, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { SharePost } from "../components/SharePost";
import { Spinar } from "../components/Spinar";
import { baseUrl } from "../BaseUrl";

export function SinglePostPage({ data }) {
  let { postId, index } = useParams();
  let [singlePostData, setSinglePostData] = useState({});
  let [allPostData, setAllPostData] = useState([]);
  let [postIndex, setPostIndex] = useState(index);
  let [isLoading,setIsLoading] = useState(false)

  // let [recentPost,setRecentPost] = useState([]);

  let getSinglePostData = async () => {
    try {
      setIsLoading(true)
      let dataSinglePost = await axios.get(`${baseUrl}/post/`);
      setAllPostData(dataSinglePost?.data);

      // finding singlePost element
      setSinglePostData(dataSinglePost?.data[postIndex]);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  // tag link componant

  let Tags = ({ data }) => {
    return (
      <Link
        style={{
          fontStyle: "italic",
          fontSize: "14px",
          backgroundColor: "#eeeeee",
          color: "#959594",
          marginRight: "15px",
          borderRadius: "5px",
          padding: "2px 5px",
        }}
        to={"/posts"}
      >
        {data?.tagName}
      </Link>
    );
  };

  // handle previous next post
  let handleNextPost = () => {
    setPostIndex((postIndex) => {
      return Number(postIndex) + 1;
    });
  };

  let handlePrevPost = () => {
    setPostIndex((postIndex) => {
      return Number(postIndex) - 1;
    });
  };

  // convert text into html
  function ComponentWithJSX({ jsxString }) {
    // Use the dangerouslySetInnerHTML property to render the JSX string as JSX.
    const renderJSXStringAsJSX = () => {
      return { __html: jsxString };
    };

    return (
      <Box>
        <div dangerouslySetInnerHTML={renderJSXStringAsJSX()} />
      </Box>
    );
  }

  let recentPost = [];
  allPostData?.map((ele, index) => {
    if (ele?.category == allPostData[postIndex]?.category) {
      //  setRecentPost([...recentPost,ele])
      recentPost.push(ele);
    }
  });

  useEffect(() => {
    getSinglePostData();
  },[index,postIndex]);

  console.log(index);
  if(isLoading){
    return <>
     <Navbar />
     <Spinar/>
    </>
  }
  return (
    <>
      <Navbar />
      <Box
        display={"grid"}
        gridTemplateColumns={{
          base: "1fr",
          lg: "1fr 26%",
        }}
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        <Box
          textAlign={"left"}
          margin={{ base: "30px 20px", sm: "30px 60px" }}
          className="longContent"
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            marginBottom={"7px"}
          >
            <Box>
              <Text classname="category" fontSize={"20px"}>
                {singlePostData.category}
              </Text>
            </Box>
            {/* Share post  */}
            <SharePost
              shareUrl={window.location.href}
              title={singlePostData?.heading + "-" + singlePostData?.intro?.substring(0,150)+"..."}
            />
          </Box>
          <hr style={{ border: "2px solid red", marginBottom: "40px" }} />

          <Box>
            <Box>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"flex-start"}>
                <Text
                  fontSize={{ base: "21px", sm: "25px", md: "35px" }}
                  color={"black"}
                  marginBottom={"15px"}
                  fontWeight={"bold"}
                >
                  <h1>{singlePostData.heading}</h1>
                </Text>
                <Box display={"flex"} fontSize={"30px"} cursor={"pointer"} mt={{base : "0px",md:"10px"}}>
                  <button disabled={postIndex == 0}>
                    <Text color={postIndex == 0 ? "gray" : "#29a4de"}>
                      {" "}
                      <BiSolidChevronLeft onClick={handlePrevPost} />
                    </Text>
                  </button>
                  <button disabled={postIndex == allPostData.length - 1}>
                    <Text
                      color={
                        postIndex == allPostData.length - 1 ? "gray" : "#29a4de"
                      }
                    >
                      <BiSolidChevronRight onClick={handleNextPost} />
                    </Text>
                  </button>
                </Box>
              </Box>
              {/* date and read Time starts */}
              <Box
                display={"flex"}
                gap="30px"
                color={"gray"}
                marginBottom={"40px"}
              >
                <Box
                  display={"flex"}
                  gap={"10px"}
                  position={"relative"}
                  top={"7px"}
                >
                  <BsCalendarDate />
                  <Text className="date" fontSize={"13px"}>
                    {singlePostData.date}
                  </Text>
                </Box>

                {/* read time  */}
                <Box
                  display={"flex"}
                  gap={"8px"}
                  position={"relative"}
                  top={"7px"}
                >
                  <MdOutlineWatchLater
                    style={{
                      fontSize: "20px",
                      position: "relative",
                      bottom: "2px",
                    }}
                  />
                  <Text fontSize={"13px"}>{singlePostData.readTime}</Text>
                </Box>
              </Box>
              {/* date and read Time starts */}

              {/* tags here  */}
              <Box
                className="tags"
                textAlign={"left"}
                marginBottom={"20px"}
                marginTop={"20px"}
              >
                <Text lineHeight={"30px"}>
                  {" "}
                  Tags :{" "}
                  {singlePostData?.tag?.map((ele, index) => {
                    return <Tags data={{ tagName: ele }} />;
                  })}
                </Text>
              </Box>
              {/* tags  end here  */}
              <Text
                width={"100%"}
                textAlign={{
                  base: "left",
                  md: "justify",
                }}
                fontSize={"18px"}
              >
                <h3><ComponentWithJSX jsxString={singlePostData.content} /></h3>
              </Text>
            </Box>
          </Box>
        </Box>

        {/* sidebar  */}
        <Box
          className="sidebar"
          padding={"15px"}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          display={{
            base: "none",
            lg: "block",
          }}
        >
          <Text
            backgroundColor={"#29a4de"}
            padding={"10px"}
            color={"white"}
            fontSize={"18px"}
            textAlign={"center"}
            borderRadius={"5px"}
            marginBottom={"20px"}
          >
            Recent Posts
          </Text>
          {recentPost.map((ele, index) => {
            return (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                padding={"10px 0px"}
                borderBottom={"2px solid #e7e7e7"}
                cursor={"pointer"}
                onClick={() => {
                  setSinglePostData(ele);
                }}
              >
                <Text>{ele.heading}</Text>
                <BiSolidChevronRight
                  style={{ fontSize: "25px", color: "gray" }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

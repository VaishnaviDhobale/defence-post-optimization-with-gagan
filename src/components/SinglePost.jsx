import { Box, Text, Button } from "@chakra-ui/react";
import { BsCalendarDate } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export function SinglePost({ data }) {
  let { ele, index } = data;
  let cursorX = localStorage.getItem("cursorX") || 66;
  let cursorY = localStorage.getItem("cursorY") || 204;
  // const isComingFromParticularPosition = document.referrer.includes('singlepostpage')
  // console.log(window.location.href)
  const prevPage = sessionStorage.getItem("prevPage");
  let check = prevPage.includes("singlepostpage");

  // handle position
  let handlePsition = (e) => {
    localStorage.setItem("cursorX", e.clientX);
    localStorage.setItem("cursorY", e.clientY);
  };

  useEffect(() => {
    if (prevPage && cursorX && cursorY) {
      window.scrollTo({
        left: cursorX - 100,
        top: cursorY - 100,
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  }, []);

  return (
    <>
      <Box
        textAlign={"left"}
        position={"relative"}
        onClick={handlePsition}
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <Link to={`/singlepostpage/${ele._id}/${index}`}>
          <Box
            display={{
              base: "block",
              md: "flex",
            }}
            alignItems={"center"}
            gap={"20px"}
          >
            <h2
              style={{
                fontSize: "28px",
                color: "#f74016",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {ele.heading}
            </h2>
          </Box>
          <Box>
            <h3 style={{display:"inline-block",fontSize:"17px"}}>
              {ele?.intro}...{" "}
              <Link
                to={`/singlepostpage/${ele._id}/${index}`}
                style={{ color: "gray" }}
              >
                Read More
              </Link>
            </h3>
          </Box>
        </Link>
      </Box>
      <Box display={"flex"} gap={"20px"} marginTop={"20px"}>
        <Box display={"flex"} gap={"8px"}>
          <BsCalendarDate style={{ fontSize: "16px" }} />
          <Text color={"gray"} fontSize={"13px"}>
            {ele.date}
          </Text>
        </Box>
        <Box display={"flex"} gap={"8px"}>
          <BiCategoryAlt />
          <Text
            color={"gray"}
            fontSize={"17px"}
            position={"relative"}
            bottom={"5px"}
          >
            {ele.category}
          </Text>
        </Box>
      </Box>
      <hr
        style={{
          marginTop: "20px",
          border: "1.2px solid #e9edf3",
          marginBottom: "40px",
        }}
      />
    </>
  );
}

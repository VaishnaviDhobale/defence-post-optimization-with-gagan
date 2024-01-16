import { Box } from "@chakra-ui/react";
import { SinglePost } from "../components/SinglePost";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinar } from "../components/Spinar";
import { baseUrl } from "../BaseUrl";

export function Post() {
  let [postData, setPostData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  let getPostData = async () => {
    try {
      setIsLoading(true);
      let dataPost = await axios.get(`${baseUrl}/post/`);
      setPostData(dataPost?.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };
  useEffect(() => {
    sessionStorage.setItem("prevPage", null);
    getPostData();
  }, []);
  // console.log(postData)

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

      <Box margin={{ base: '30px 20px', sm: '30px 60px' }} fontFamily="Roboto, sans-serif">
      {postData && postData?.map((ele, index) => {
        return <SinglePost key={index} data={{ ele, index }} />;
      })}
    </Box>
    </>
  );
}

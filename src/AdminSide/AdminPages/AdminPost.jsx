import { Box, Text, Input, Button, useToast } from "@chakra-ui/react";

import { AdminNavbar } from "../adminComponents/AdminNavbar";
import { useEffect, useState } from "react";
// import { AlertCompo } from "../../components/AlertCompo";
import { SinglePost } from "../adminComponents/SinglePost";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CustomHTMLTagEditor } from "../adminComponents/CustomHTMLTagEditor";
import { baseUrl } from "../../BaseUrl";

export function AdminPost() {
  // let baseUrl = "https://breakable-dirndl-yak.cyclic.cloud/";
  // let baseUrl = "https://backend.defencepost.in";

  let toast = useToast();

  // This state for a accept post details
  let [postData, setPostData] = useState({});
  let [updatePostData, setUpdatePostData] = useState({});

  let [postDone, setPostDone] = useState(false);

  let [showAddForm, setShowAddForm] = useState(false);
  let [showUpdateForm, setShowUpdateForm] = useState(false);
  let [allPostDataGet, setAllPostDataGet] = useState([]);
  let [updateEle, setUpdateEle] = useState({});
  const [editorData, setEditorData] = useState("<p>Hello, CKEditor!</p>");

  // css starts
  const inputStyle = {
    border: "1.5px solid #00ACEE",
    marginBottom: "40px",
    outline: "none",
    padding: "10px",
    width: "100%",
    fontSize: "17.5px",
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
  // css ends

  async function addPost() {
    // console.log(postData);
    try {
      let addPostData = await axios.post(`${baseUrl}/post/add`, postData);
      if (addPostData.status == 200 && addPostData.data.msg) {
        toast({
          title: "Post Added",
          // description: "Have a great day",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        getAllPostData();
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
  // Post form functionality start
  const postForm = (event) => {
    event.preventDefault();
    setPostDone(true);
    console.log(postData);

    addPost();

    setTimeout(() => {
      setPostDone(false);
    }, 2000);

    // Reset the form
    event.target.reset(); // This will reset all form fields
  };

  // handleling input here
  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "tag") {
      let tagArr = value.split(",");
      // console.log(tagArr);
      setPostData({ ...postData, [name]: tagArr });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  // get all post data
  let getAllPostData = async () => {
    try {
      let dataPostGet = await axios.get(`${baseUrl}/post/`);
      setAllPostDataGet(dataPostGet.data);
    } catch (err) {
      alert(err);
    }
  };

  // handle delete
  let handleDelete = async (id) => {
    try {
      const userResponse = window.confirm("Are you sure you want to delete post?");
      if (userResponse) {
        let deleteData = await axios.delete(`${baseUrl}/post/delete/${id}`);
        if (deleteData.status === 200) {
          toast({
            title: deleteData.data.msg,
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          getAllPostData();
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
  };

  // update Post form
  let updatePostForm = (element) => {
    setShowUpdateForm(true);
    setUpdateEle(element);
  };

  let postUpdatedData = async () => {
    try {
      let data = await axios.patch(
        `${baseUrl}/post/patch/${updateEle._id}`,
        updateEle
      );
      if (data.status === 200) {
        toast({
          title: data.data.msg,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        getAllPostData();
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
  let postUpdateData = (e) => {
    e.preventDefault();

    postUpdatedData();
  };

  // update tags

  let updateTags = () => {
    let arr = e.target.value.split(",");
    console.log(arr);
    setUpdateEle({
      ...updateEle,
      tag: arr,
    });
  };

  useEffect(() => {
    getAllPostData();
  }, []);

  // console.log(allPostDataGet);
  return (
    <>
      <AdminNavbar />

      <Box display={"flex"} justifyContent={"center"} gap={"30px"}>
        <Button
          backgroundColor={"#00ACEE"}
          color={"white"}
          fontWeight={"500"}
          marginTop={{ base: "60px", sm: "60px", md: "40px" }}
          onClick={() => {
            setShowAddForm(!showAddForm);
            if (showUpdateForm == true) {
              setShowUpdateForm(false);
            }
          }}
        >
          {showAddForm ? "Hide Add Post" : "Add Post"}
        </Button>

        <Button
          backgroundColor={"#00ACEE"}
          color={"white"}
          fontWeight={"500"}
          marginTop={{ base: "60px", sm: "60px", md: "40px" }}
          onClick={() => {
            setShowUpdateForm(!showUpdateForm);
            if (showAddForm == true) {
              setShowAddForm(false);
            }
          }}
        >
          {showUpdateForm ? "Hide Update Post" : "Update Post"}
        </Button>
      </Box>
      {showAddForm && (
        <Box
          width={{
            base: "100%",
            md: "50%",
            lg: "60%",
          }}
          margin={"auto"}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          padding={"30px"}
          marginBottom={"100px"}
          borderRadius={"20px"}
          position={"relative"}
          marginTop={"50px"}
        >
          <Text fontSize={"30px"} fontWeight={"Bold"} marginBottom={"30px"}>
            Add Post
          </Text>
          <form style={{ textAlign: "left" }} onSubmit={postForm}>
            {/* Heading  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Heading*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Heading"
              required
              onChange={handleInput}
              name="heading"
            />

            {/* Intro  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Intro*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Intro.."
              required
              onChange={handleInput}
              name="intro"
            />

            {/* Read Time  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Read Time*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Read time"
              required
              onChange={handleInput}
              name="readTime"
            />

            {/* Date  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Date*
            </label>
            <input
              style={inputStyle}
              type="date"
              placeholder="Date"
              required
              onChange={handleInput}
              name="date"
            />

            {/* Category  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Category*
            </label>
            <select
              style={inputStyle}
              type="text"
              required
              onChange={handleInput}
              name="category"
            >
              <option value="">Select Category</option>
              <option value="World Affairs">World Affairs</option>
              <option value="History">History</option>
              <option value="Politics">Politics</option>
              <option value="Geopolitics">Geopolitics</option>
              <option value="Current Affairs">Current Affairs</option>
              <option value="National Interest">National Interest</option>
              <option value="Exam Important">Exam Important</option>
              <option value="International Relations">
                International Relations
              </option>
              <option value="Science And Technology">
                Science And Technology
              </option>
            </select>

            {/* Tags  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Tags*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Tags"
              required
              onChange={handleInput}
              name="tag"
            />

            <Box>
              {/* Content  */}
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                Content*
              </label>
              <CustomHTMLTagEditor onTextareaChange={handleInput} />
            </Box>

            {/* Add button  */}
            <input style={button} type="submit" value={"Add Post"} />
          </form>

          {/* {postDone && (
              <AlertCompo data={{ type: "success", msg: "Post Added" }} />
            )} */}
        </Box>
      )}

      {/* update form  */}

      {showUpdateForm && (
        <Box
          width={{
            base: "100%",
            md: "50%",
            lg: "60%",
          }}
          margin={"auto"}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          padding={"30px"}
          marginBottom={"100px"}
          borderRadius={"20px"}
          position={"relative"}
          marginTop={"50px"}
        >
          <Text fontSize={"30px"} fontWeight={"Bold"} marginBottom={"30px"}>
            Update Post
          </Text>
          <form style={{ textAlign: "left" }} onSubmit={postUpdateData}>
            {/* Id  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Id*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Id"
              required
              value={updateEle._id}
              // onChange={handlePostInput}
              name="_id"
            />
            {/* Heading  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Heading*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Heading"
              required
              value={updateEle.heading}
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  heading: e.target.value,
                });
              }}
              name="heading"
            />

            {/* Intro  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Intro*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Intro.."
              required
              value={updateEle.intro}
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  intro: e.target.value,
                });
              }}
              name="intro"
            />

            {/* Read Time  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Read Time*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Read time"
              required
              value={updateEle.readTime}
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  readTime: e.target.value,
                });
              }}
              name="readTime"
            />

            {/* Date  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Date*
            </label>
            <input
              style={inputStyle}
              type="date"
              placeholder="Date"
              required
              value={updateEle.date}
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  date: e.target.value,
                });
              }}
              name="date"
            />

            {/* Category  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Category*
            </label>
            <select
              style={inputStyle}
              type="text"
              required
              value={updateEle.category}
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  category: e.target.value,
                });
              }}
              name="category"
            >
              <option value="">Select Category</option>
              <option value="World Affairs">World Affairs</option>
              <option value="History">History</option>
              <option value="Politics">Politics</option>
              <option value="Geopolitics">Geopolitics</option>
              <option value="Current Affairs">Current Affairs</option>
              <option value="National Interest">National Interest</option>
              <option value="Exam Important">Exam Important</option>
              <option value="International Relations">
                International Relations
              </option>
              <option value="Science And Technology">
                Science And Technology
              </option>
            </select>

            {/* Tags  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Tags*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Tags"
              required
              value={updateEle.tag}
              onChange={updateTags}
              name="tag"
            />

            {/* Content  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Content*
            </label>
            <textarea
              style={inputStyle}
              placeholder="Content..."
              required
              value={updateEle.content}
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  content: e.target.value,
                });
              }}
              name="content"
            ></textarea>

            {/* Add button  */}
            <input style={button} type="submit" value={"Update Post"} />
          </form>

          {/* {postDone && (
              <AlertCompo data={{ type: "success", msg: "Post Added" }} />
            )} */}
        </Box>
      )}

      {/* Show Posts  */}
      <Text fontWeight={"bold"} fontSize={"30px"} marginTop={"30px"}>
        All Posts
      </Text>
      <Box margin={{ base: "30px 20px", sm: "30px 60px" }}>
        {allPostDataGet &&
          allPostDataGet.map((ele, index) => {
            return <SinglePost data={{ ele, handleDelete, updatePostForm }} />;
          })}
      </Box>
    </>
  );
}

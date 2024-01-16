import { Box, Text, Input, Button, useToast } from "@chakra-ui/react";

import { AdminNavbar } from "../adminComponents/AdminNavbar";
import { useEffect, useState } from "react";
import { AlertCompo } from "../../components/AlertCompo";
import { SingleCourse } from "../adminComponents/SingleCourse";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../BaseUrl";

export function AdminAddCourse() {
  let toast = useToast();

  // This state for a accept post details
  const [localFormData, setLocalFormData] = useState({});
  let [courseDone, setcourseDone] = useState(false);

  let [showAddForm, setShowAddForm] = useState(false);
  let [showUpdateForm, setShowUpdateForm] = useState(false);

  let [pdfData, setPdfData] = useState(null);

  let [allCourseDataGet, setAllCourseDataGet] = useState([]);
  let [updateEle, setUpdateEle] = useState([]);
  const [allReviewData, setAllReviewData] = useState([]);
  // let [linkDataCourse,setLinkDataCourse] = useState(updateEle.coursePDF || []);
  // let [linkDataPreview,setLinkDataPreview] = useState(updateEle.previewPDF || []);

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

  const btn = {
    outline: "none",
    padding: "10px",
    // width: "100%",
    backgroundColor: "#00ACEE",
    cursor: "pointer",
    color: "white",
    fontSize: "17.5px",
    margin: "5px",
  };

  const btn1 = {
    outline: "none",
    padding: "10px",
    // width: "100%",
    backgroundColor: "#FF0000",
    cursor: "pointer",
    color: "white",
    fontSize: "17.5px",
    margin: "5px",
  };

  // css ends

  const [courseData, setCourseData] = useState({
    name: "",
    title: "",
    price: "",
    discount: "",
    sellPrice: "",
    description: "",
    thumbnail: "",
    previewPDFName: "",
    previewPDF: "",
    folders: [],
  });

  async function addCourse(formDataToSend) {
    console.log(formDataToSend);
    try {
      let addCourseData = await axios.post(
        `${baseUrl}/course/add`,
        formDataToSend
      );
      if (addCourseData.status == 200) {
        toast({
          title: "Course Added",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        // getAllCourseData();
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
  const courseForm = (event) => {
    // alert("ok");
    event.preventDefault();
    let formData = new FormData();
    formData = localFormData;
    console.log(formData);
    // console.log(localFormData);
    addCourse(formData);
    setcourseDone(true);

    setTimeout(() => {
      setcourseDone(false);
    }, 2000);

    // Reset the form
    event.target.reset(); // This will reset all form fields
  };

  // handleling input here
  const handleInput = async (event) => {
    // const { name, type, value, files } = event.target;
    const { name, value } = event.target;
    //  if (name === "previewPDF" || name === "coursePDF" || name === "previewPDFName" || name === "coursePDFName") {
    //   const arrayData = value.split(',').map((item) => item.trim());
    //   setLocalFormData({
    //     ...localFormData,
    //     [name]: arrayData,
    //   });
    // }else{
    setCourseData({
      ...courseData,
      [name]: value,
    });
    // }
  };

  // get all post data
  //   let getAllCourseData = async () => {
  //     try {
  //       let dataPostGet = await axios.get(`${baseUrl}/course/`);
  //       setAllCourseDataGet(dataPostGet.data);
  //     } catch (err) {
  //       alert(err);
  //     }
  //   };

  // get all review data
  //   let getReviewData = async () => {
  //     try {
  //       let reviewsData = await axios.get(`${baseUrl}/review/`);
  //       console.log(reviewsData)
  //       setAllReviewData(reviewsData)
  //     } catch (err) {
  //       alert(err);
  //     }
  //   };
  // handle delete
  //   let handleDelete = async (id) => {
  //     try {
  //       const userResponse = window.confirm(
  //         "Are you sure you want to delete course?"
  //       );
  //       if (userResponse) {
  //         let deleteData = await axios.delete(`${baseUrl}/course/delete/${id}`);
  //         if (deleteData.status === 200) {
  //           toast({
  //             title: deleteData.data.msg,
  //             status: "success",
  //             duration: 4000,
  //             isClosable: true,
  //             position: "top",
  //           });
  //           getAllCourseData();
  //         } else {
  //           toast({
  //             title: "Something is wrong",
  //             status: "error",
  //             duration: 4000,
  //             isClosable: true,
  //             position: "top",
  //           });
  //         }
  //       }
  //     } catch (err) {
  //       alert(err);
  //     }
  //   };

  // update Course form
  //   let updateCourseForm = (element) => {
  //     setShowUpdateForm(true);
  //     setUpdateEle(element);
  //   };

  //   let postUpdatedCourseData = async () => {
  //     try {
  //       let data = await axios.patch(
  //         `${baseUrl}/course/patch/${updateEle._id}`,
  //         updateEle
  //       );
  //       if (data.status === 200) {
  //         toast({
  //           title: data.data.msg,
  //           status: "success",
  //           duration: 4000,
  //           isClosable: true,
  //           position: "top",
  //         });
  //         getAllCourseData();
  //       } else {
  //         toast({
  //           title: "Something is wrong",
  //           status: "error",
  //           duration: 4000,
  //           isClosable: true,
  //           position: "top",
  //         });
  //       }
  //     } catch (err) {
  //       alert(err);
  //     }
  //   };
  //   let courseUpdatedData = (e) => {
  //     e.preventDefault();

  //     postUpdatedCourseData();
  //   };

  //   useEffect(() => {
  //     getReviewData()
  //     getAllCourseData();
  //   }, []);

  // console.log(updateEle.previewPDF,linkDataCourse,linkDataPreview)

  const handleFolderChange = (e, folderIndex) => {
    console.log(e.target.value);
    e.preventDefault();
    const { name, value } = e.target;
    const updatedFolders = [...courseData.folders];
    updatedFolders[folderIndex][name] = value;
    console.log(updatedFolders);
    setCourseData({ ...courseData, folders: updatedFolders });
  };

  const handleContentChange = (e, folderIndex, contentIndex) => {
    const { name, value } = e.target;
    const updatedFolders = [...courseData.folders];
    updatedFolders[folderIndex].contents[contentIndex][name] = value;
    setCourseData({ ...courseData, folders: updatedFolders });
  };

  const handleAddFolder = () => {
    setCourseData({
      ...courseData,
      folders: [...courseData.folders, { name: "", contents: [] }],
    });
  };

  const handleRemoveFolder = (folderIndex) => {
    const updatedFolders = [...courseData.folders];
    updatedFolders.splice(folderIndex, 1);
    setCourseData({ ...courseData, folders: updatedFolders });
  };

  const handleAddContent = (folderIndex) => {
    const updatedFolders = [...courseData.folders];
    updatedFolders[folderIndex].contents.push({
      coursePDFName: "",
      coursePDF: "",
    });
    setCourseData({ ...courseData, folders: updatedFolders });
  };

  const handleRemoveContent = (folderIndex, contentIndex) => {
    const updatedFolders = [...courseData.folders];
    updatedFolders[folderIndex].contents.splice(contentIndex, 1);
    setCourseData({ ...courseData, folders: updatedFolders });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Course Data:", courseData);
    // You can send the courseData to your server or perform any other actions here
    try {
        let addCourseData = await axios.post(
          `${baseUrl}/course/add`,
          courseData
        );
        if (addCourseData.status == 200) {
          toast({
            title: "Course Added",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          // getAllCourseData();
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

  return (
    <>
      <AdminNavbar />

      <Box marginTop={{ base: "60px", sm: "60px", md: "40px" }}>
        {/* Course add Show/hide Button  */}
        {/* <Box display="flex" justifyContent={"center"} gap={"20px"}>
          <Button
            backgroundColor={"#00ACEE"}
            color={"white"}
            fontWeight={"500"}
            onClick={() => {
              setShowUpdateForm(false);
              setShowAddForm(!showAddForm);
            }}
          >
            {showAddForm ? "Hide Add Course" : "Add Course"}
          </Button>

          <Button
            backgroundColor={"#00ACEE"}
            color={"white"}
            fontWeight={"500"}
            onClick={() => {
              setShowAddForm(false);
              setShowUpdateForm(!showUpdateForm);
            }}
          >
            {showUpdateForm ? "Hide Update Course" : "Update Course"}
          </Button>
        </Box> */}

        {/* Add Course  */}
        {/* {showAddForm && ( */}
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
          marginTop={"50px"}
          borderRadius={"20px"}
          position={"relative"}
        >
          <Text fontSize={"30px"} fontWeight={"Bold"} marginBottom={"30px"}>
            Add Course
          </Text>
          <form
            method="POST"
            encType="multipart/form-data"
            style={{ textAlign: "left" }}
            onSubmit={handleSubmit}
          >
            {/* Course Name  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Course Namehbhh*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Course Name"
              required
              onChange={handleInput}
              name="name"
            />

            {/* Title  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Title*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Title"
              required
              onChange={handleInput}
              name="title"
            />

            <Box
              display={{ base: "block", sm: "grid" }}
              gridTemplateColumns={"repeat(3,1fr)"}
              gap={"30px"}
            >
              <Box>
                {/* Price  */}
                <label
                  htmlFor=""
                  style={{
                    alignItems: "left",
                    fontSize: "20px",
                    marginLeft: "2px",
                  }}
                >
                  Price*
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Price"
                  required
                  onChange={handleInput}
                  name="price"
                />
              </Box>

              <Box>
                {/* Discount  */}
                <label
                  htmlFor=""
                  style={{
                    alignItems: "left",
                    fontSize: "20px",
                    marginLeft: "2px",
                  }}
                >
                  Discount*
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Discount"
                  required
                  onChange={handleInput}
                  name="discount"
                />
              </Box>

              <Box>
                {/* Sell Price  */}
                <label
                  htmlFor=""
                  style={{
                    alignItems: "left",
                    fontSize: "20px",
                    marginLeft: "2px",
                  }}
                >
                  Sell Price*
                </label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder=" Sell Price"
                  required
                  onChange={handleInput}
                  name="sellPrice"
                />
              </Box>
            </Box>

            {/* Description  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Description*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Description"
              required
              onChange={handleInput}
              name="description"
            />

            {/* thumbnail  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Thumbnail*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Thumbnail"
              required
              onChange={handleInput}
              name="thumbnail"
            />
            {/* Select a Preview PDF file Names  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Preview PDF/Videos Names*
            </label>
            <textarea
              style={inputStyle}
              required
              onChange={handleInput}
              name="previewPDFName"
              type="text"
              placeholder="Preview Data"
            ></textarea>

            {/* Select a Preview PDF file:  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Preview PDF/Videos*
            </label>
            <textarea
              style={inputStyle}
              required
              onChange={handleInput}
              name="previewPDF"
              type="text"
              placeholder="Preview Data"
            ></textarea>

            {/* Select a Course PDF file names  */}
            {/* <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
              Course PDF/Videos Names*
              </label>
              <textarea
                style={inputStyle}
                required
                onChange={handleInput}
                name="coursePDFName"
                type="text"
                placeholder="Course Data Names"
              ></textarea> */}

            {/* Select a Course PDF file:  */}
            {/* <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
              Course PDF/Videos*
              </label>
              <textarea
                style={inputStyle}
                required
                onChange={handleInput}
                name="coursePDF"
                type="text"
                placeholder="Course Data"
              ></textarea> */}
            {courseData.folders.map((folder, folderIndex) => (
              <div key={folderIndex}>
                <label
                  style={{
                    alignItems: "left",
                    fontSize: "20px",
                    marginLeft: "2px",
                  }}
                >
                  Folder Name:
                  <input
                    style={inputStyle}
                    type="text"
                    name="name"
                    value={folder.name}
                    onChange={(e) => handleFolderChange(e, folderIndex)}
                  />
                </label>

                {folder.contents.map((content, contentIndex) => (
                  <div key={contentIndex}>
                    <label
                      style={{
                        alignItems: "left",
                        fontSize: "20px",
                        marginLeft: "2px",
                      }}
                    >
                      Course PDF Name:
                      <input
                        style={inputStyle}
                        type="text"
                        name="coursePDFName"
                        value={content.coursePDFName}
                        onChange={(e) =>
                          handleContentChange(e, folderIndex, contentIndex)
                        }
                      />
                    </label>

                    <label
                      style={{
                        alignItems: "left",
                        fontSize: "20px",
                        marginLeft: "2px",
                      }}
                    >
                      Course PDF:
                      <input
                        style={inputStyle}
                        type="text"
                        name="coursePDF"
                        value={content.coursePDF}
                        onChange={(e) =>
                          handleContentChange(e, folderIndex, contentIndex)
                        }
                      />
                    </label>

                    <button
                      style={btn1}
                      type="button"
                      onClick={() =>
                        handleRemoveContent(folderIndex, contentIndex)
                      }
                    >
                      Remove Content
                    </button>
                  </div>
                ))}

                <button
                  style={btn}
                  type="button"
                  onClick={() => handleAddContent(folderIndex)}
                >
                  Add Content
                </button>

                <button
                  style={btn1}
                  type="button"
                  onClick={() => handleRemoveFolder(folderIndex)}
                >
                  Remove Folder
                </button>
              </div>
            ))}

            <button type="button" style={btn} onClick={handleAddFolder}>
              Add Folder
            </button>

            {/* Select a Intro video:  */}
            <br />
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Select Intro Videos*
            </label>
            <input
              style={inputStyle}
              required
              onChange={handleInput}
              name="introVideo"
              type="text"
              placeholder="Intro Video"
            ></input>

            {/* Add button  */}
            <input style={button} type="submit" value={"Add Course"} />
          </form>

          {/* Course Added alert 
            {courseDone && (
              <AlertCompo data={{ type: "success", msg: "Course Added" }} />
            )} */}
        </Box>
        {/* )} */}
      </Box>
    </>
  );
}

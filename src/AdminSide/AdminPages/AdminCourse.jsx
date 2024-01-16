import { Box, Text, Input, Button, useToast } from "@chakra-ui/react";

import { AdminNavbar } from "../adminComponents/AdminNavbar";
import { useEffect, useState } from "react";
import { AlertCompo } from "../../components/AlertCompo";
import { SingleCourse } from "../adminComponents/SingleCourse";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../BaseUrl";

export function AdminCourse() {
  // let baseUrl = "https://breakable-dirndl-yak.cyclic.cloud/";
  // let baseUrl = "https://backend.defencepost.in";
  // let baseUrl = "http://localhost:8000"

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
        getAllCourseData();
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
    if (name === "previewPDF" || name === "previewPDFName") {
      const arrayData = value.split(",").map((item) => item.trim());
      setCourseData({
        ...courseData,
        [name]: arrayData,
      });
    } else {
      setCourseData({
        ...courseData,
        [name]: value,
      });
    }
  };

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
      let addCourseData = await axios.post(`${baseUrl}/course/add`, courseData);
      if (addCourseData.status == 200) {
        toast({
          title: "Course Added",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        getAllCourseData();
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

  // get all post data
  let getAllCourseData = async () => {
    try {
      let dataPostGet = await axios.get(`${baseUrl}/course/`);
      setAllCourseDataGet(dataPostGet.data);
    } catch (err) {
      alert(err);
    }
  };

  // get all review data
  let getReviewData = async () => {
    try {
      let reviewsData = await axios.get(`${baseUrl}/review/`);
      console.log(reviewsData);
      setAllReviewData(reviewsData);
    } catch (err) {
      alert(err);
    }
  };
  // handle delete
  let handleDelete = async (id) => {
    try {
      const userResponse = window.confirm(
        "Are you sure you want to delete course?"
      );
      if (userResponse) {
        let deleteData = await axios.delete(`${baseUrl}/course/delete/${id}`);
        if (deleteData.status === 200) {
          toast({
            title: deleteData.data.msg,
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          getAllCourseData();
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

  // update Course form
  let updateCourseForm = (element) => {
    setShowUpdateForm(true);
    setUpdateEle(element);
  };

  let postUpdatedCourseData = async () => {
    try {
      let data = await axios.patch(
        `${baseUrl}/course/patch/${updateEle._id}`,
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
        getAllCourseData();
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
  let courseUpdatedData = (e) => {
    e.preventDefault();

    postUpdatedCourseData();
  };

  useEffect(() => {
    getReviewData();
    getAllCourseData();
  }, []);

  // console.log(updateEle.previewPDF,linkDataCourse,linkDataPreview)

  return (
    <>
      <AdminNavbar />

      <Box marginTop={{ base: "60px", sm: "60px", md: "40px" }}>
        {/* Course add Show/hide Button  */}
        <Box display="flex" justifyContent={"center"} gap={"20px"}>
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
        </Box>

        {/* Add Course  */}
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
                Course Name*
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

              {/* Select a Intro video:  */}
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
        )}

        {/* update Course  */}
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
            marginTop={"50px"}
            borderRadius={"20px"}
            position={"relative"}
          >
            <Text fontSize={"30px"} fontWeight={"Bold"} marginBottom={"30px"}>
              Update Course
            </Text>
            <form
              method="POST"
              encType="multipart/form-data"
              style={{ textAlign: "left" }}
              onSubmit={courseUpdatedData}
            >
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
              {/* Course Name  */}
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                Course Name*
              </label>
              <input
                style={inputStyle}
                type="text"
                placeholder="Course Name"
                required
                onChange={(e) => {
                  setUpdateEle({
                    ...updateEle,
                    name: e.target.value,
                  });
                }}
                name="name"
                value={updateEle.name}
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
                onChange={(e) => {
                  setUpdateEle({
                    ...updateEle,
                    title: e.target.value,
                  });
                }}
                name="title"
                value={updateEle.title}
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
                    onChange={(e) => {
                      setUpdateEle({
                        ...updateEle,
                        price: e.target.value,
                      });
                    }}
                    name="price"
                    value={updateEle.price}
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
                    onChange={(e) => {
                      setUpdateEle({
                        ...updateEle,
                        discount: e.target.value,
                      });
                    }}
                    name="discount"
                    value={updateEle.discount}
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
                    onChange={(e) => {
                      setUpdateEle({
                        ...updateEle,
                        sellPrice: e.target.value,
                      });
                    }}
                    name="sellPrice"
                    value={updateEle.sellPrice}
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
                onChange={(e) => {
                  setUpdateEle({
                    ...updateEle,
                    description: e.target.value,
                  });
                }}
                name="description"
                value={updateEle.description}
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
                onChange={(e) => {
                  setUpdateEle({
                    ...updateEle,
                    thumbnail: e.target.value,
                  });
                }}
                name="thumbnail"
                value={updateEle.thumbnail}
              />

              {/* coursePDFName  */}
              {updateEle.folders.map((folder, folderIndex) => (
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
                      // onChange={(e) => handleFolderChange(e, folderIndex)}
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
                          // onChange={(e) =>
                          //   handleContentChange(e, folderIndex, contentIndex)
                          // }
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
                          // onChange={(e) =>
                          //   handleContentChange(e, folderIndex, contentIndex)
                          // }
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
                    // onClick={() => handleAddContent(folderIndex)}
                  >
                    Add Content
                  </button>

                  <button
                    style={btn1}
                    type="button"
                    // onClick={() => handleRemoveFolder(folderIndex)}
                  >
                    Remove Folder
                  </button>
                </div>
              ))}
              <button
                type="button"
                style={btn}
                //  onClick={handleAddFolder}
              >
                Add Folder
              </button>
              <br />
              {/* <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                CoursePDF Name*
              </label> */}
              {/* <textarea
                style={inputStyle}
                type="text"
                placeholder="coursePDFName"
                required
                onChange={(e) => {
                  setUpdateEle({
                    ...updateEle,
                    coursePDFName: e.target.value.split(",\n"),
                  });
                }}
                name="coursePDFName"
                value={updateEle.coursePDFName?.join(",\n")}
              /> */}

              {/* coursePDF  */}
              {/* <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                CoursePDF*
              </label> */}
              {/* <textarea
                style={inputStyle}
                type="text"
                placeholder="coursePDF"
                required
                onChange={(e) => {
                  setUpdateEle({
                    ...updateEle,
                    coursePDF: e.target.value?.split(",\n"),
                  });
                }}
                name="coursePDF"
                value={updateEle?.coursePDF?.join(",\n")}
              /> */}

              {/* previewPDFName  */}
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                previewPDF Name*
              </label>
              <textarea
                style={inputStyle}
                type="text"
                placeholder="previewPDFName"
                required
                onChange={(e) => {
                  setUpdateEle({
                    ...updateEle,
                    previewPDFName: e.target.value?.split(",\n"),
                  });
                }}
                name="previewPDFName"
                value={updateEle.previewPDFName?.join(",\n")}
              />

              {/* previewPDF  */}
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                previewPDF*
              </label>
              <textarea
                style={inputStyle}
                type="text"
                placeholder="previewPDF"
                required
                onChange={(e) => {
                  setUpdateEle({
                    ...updateEle,
                    previewPDF: e.target.value.split(",\n"),
                  });
                }}
                name="previewPDF"
                value={updateEle?.previewPDF?.join(",\n")}
              />

              {/* introVideo  */}
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                introVideo*
              </label>
              <input
                style={inputStyle}
                type="text"
                placeholder="introVideo"
                required
                onChange={(e) => {
                  setUpdateEle({
                    ...updateEle,
                    introVideo: e.target.value,
                  });
                }}
                name="introVideo"
                value={updateEle.introVideo}
              />
              {/* Add button  */}
              <input style={button} type="submit" value={"Update Course"} />
            </form>

            {/* Course Added alert  */}
            {courseDone && (
              <AlertCompo data={{ type: "success", msg: "Course Added" }} />
            )}
          </Box>
        )}
        {/* Course Design  */}
        <Text fontWeight={"bold"} fontSize={"30px"} marginTop={"30px"}>
          All Courses
        </Text>
        <Box
          display={"grid"}
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
          }}
          gap={"50px"}
          margin={{
            base: "30px 20px",
            sm: "30px 60px",
          }}
        >
          {allCourseDataGet &&
            allCourseDataGet.map((ele, index) => {
              return (
                <SingleCourse data={{ ele, handleDelete, updateCourseForm }} />
              );
            })}
        </Box>
        {pdfData && (
          <Link to={pdfData} target="_blank" style={{ fontSize: "20px" }}>
            Name of the preview course
          </Link>
        )}
      </Box>
    </>
  );
}

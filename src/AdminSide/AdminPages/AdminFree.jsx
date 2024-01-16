import { AdminNavbar } from "../adminComponents/AdminNavbar";
import { Box, Text, Input, Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AlertCompo } from "../../components/AlertCompo";
import { FreeCart } from "../adminComponents/FreeCart";
import axios from "axios";
import { baseUrl } from "../../BaseUrl";

export function AdminFree() {
  // let baseUrl = "https://breakable-dirndl-yak.cyclic.cloud/";
  // let baseUrl = "https://backend.defencepost.in";
  // let baseUrl = "http://localhost:8000";

  let toast = useToast();

  let [freeData, setFreeData] = useState({});

  let [showFreeForm, setShowFreeForm] = useState(false);
  let [showUpdateFreeForm, setShowUpdateFreeForm] = useState(false);
  let [allFreeDataGet, setAllFreeDataGet] = useState([]);
  let [updateEle, setUpdateEle] = useState({});

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

  // post free data
  let postFreeData = async (formData) => {
    // console.log(formData);
    try {
      let dataFree = await axios.post(`${baseUrl}/free/add`, formData);
      if (dataFree.status === 200) {
        toast({
          title: "Free Containt Added",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        getAllFreeData();
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

  // Post form functionality start
  const postForm = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData = freeData;
    console.log(formData);
    postFreeData(formData);

    // Reset the form
    event.target.reset(); // This will reset all form fields
  };

  // handleling input here
  const handleInput = async (event) => {
    const { name, value } = event.target;
    if (name == "freePdf" || name == "freePdfName") {
      const arrayData = value.split(",").map((item) => item.trim());
      console.log(arrayData);
      setFreeData({
        ...freeData,
        [name]: arrayData,
      });
    } else {
      console.log(name);
      setFreeData({
        ...freeData,
        [name]: value,
      });
    }
  };

  let getAllFreeData = async () => {
    try {
      let dataFreeGet = await axios.get(`${baseUrl}/free/`);
      setAllFreeDataGet(dataFreeGet.data);
    } catch (err) {
      alert(err);
    }
  };
  let handleDelete = async (id) => {
    try {
      const userResponse = window.confirm(
        "Are you sure you want to delete free content?"
      );
      if (userResponse) {
        let deleteData = await axios.delete(`${baseUrl}/free/delete/${id}`);
        if (deleteData.status === 200) {
          toast({
            title: deleteData.data.msg,
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          getAllFreeData();
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
  let updateFreeForm = (element) => {
    setShowUpdateFreeForm(true);
    setUpdateEle(element);
  };
  let postUpdatedFreeData = async () => {
    try {
      console.log(updateEle)
      let data = await axios.patch(
        `${baseUrl}/free/patch/${updateEle._id}`,
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
        getAllFreeData();
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
  let freeUpdatedData = (e) => {
    e.preventDefault();

    postUpdatedFreeData();
  };
  useEffect(() => {
    getAllFreeData();
  }, []);
  // console.log(allFreeDataGet)
  return (
    <>
      <AdminNavbar />
      <Box display={"flex"} justifyContent={"center"} gap={"20px"}>
        <Button
          backgroundColor={"#00ACEE"}
          color={"white"}
          fontWeight={"500"}
          marginTop={{ base: "60px", sm: "60px", md: "40px" }}
          onClick={() => {
            setShowUpdateFreeForm(false);
            setShowFreeForm(!showFreeForm);
          }}
        >
          {showFreeForm ? "Hide add free" : "Add Free Content"}
        </Button>

        <Button
          backgroundColor={"#00ACEE"}
          color={"white"}
          fontWeight={"500"}
          marginTop={{ base: "60px", sm: "60px", md: "40px" }}
          onClick={() => {
            setShowFreeForm(false);
            setShowUpdateFreeForm(!showUpdateFreeForm);
          }}
        >
          {showUpdateFreeForm ? "Hide update free" : "Update Free Content"}
        </Button>
      </Box>

      {showFreeForm && (
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
          {/* form heading here  */}
          <Text fontSize={"30px"} fontWeight={"Bold"} marginBottom={"30px"}>
            Add Free Content
          </Text>

          {/* Form starting here  */}
          <form style={{ textAlign: "left" }} onSubmit={postForm}>
            {/* Name  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Name*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Name"
              required
              onChange={handleInput}
              name="name"
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

            {/* add pdf or video Name  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Upload PDF/Video Name*
            </label>
            <textarea
              style={inputStyle}
              required
              onChange={handleInput}
              name="freePdfName"
              type="text"
              placeholder="Free Pdf Name"
            ></textarea>

            {/* add pdf or video */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Upload PDF/Video*
            </label>
            <textarea
              style={inputStyle}
              required
              onChange={handleInput}
              name="freePdf"
              type="text"
              placeholder="Free Pdf"
            ></textarea>

            {/* Add button  */}
            <input style={button} type="submit" value={"Add Free Content"} />
          </form>
        </Box>
      )}

      {/* update free  */}
      {showUpdateFreeForm && (
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
          {/* form heading here  */}
          <Text fontSize={"30px"} fontWeight={"Bold"} marginBottom={"30px"}>
            Update Free Content
          </Text>

          {/* Form starting here  */}
          <form style={{ textAlign: "left" }} onSubmit={freeUpdatedData}>
            {/* Name  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Name*
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  name: e.target.value,
                });
              }}
              name="name"
              value={updateEle.name}
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
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  thumbnail: e.target.value,
                });
              }}
              name="thumbnail"
              value={updateEle.thumbnail}
            />

            {/* add pdf or video name  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Upload PDF/Video Name*
            </label>
            <textarea
              style={inputStyle}
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  freePdfName: e.target.value.split(",\n"), // Convert the input value to an array
                });
              }}
              name="freePdfName"
              type="text"
              placeholder="Free Pdf"
              value={updateEle?.freePdfName?.join(",\n") || ""} // Join the array elements with commas
            ></textarea>

            {/* add pdf or video  */}
            <label
              htmlFor=""
              style={{
                alignItems: "left",
                fontSize: "20px",
                marginLeft: "2px",
              }}
            >
              Upload PDF/Video*
            </label>
            <textarea
              style={inputStyle}
              onChange={(e) => {
                setUpdateEle({
                  ...updateEle,
                  freePdf: e.target.value.split(",\n"), // Convert the input value to an array
                });
              }}
              name="freePdf"
              type="text"
              placeholder="Free Pdf"
              value={updateEle?.freePdf?.join(",\n") || ""} // Join the array elements with commas
            ></textarea>

            {/* Add button  */}
            <input style={button} type="submit" value={"Update Free Content"} />
          </form>
        </Box>
      )}

      {/* Show Free content  */}
      <Text fontWeight={"bold"} fontSize={"30px"} marginTop={"50px"}>
        All Free Content
      </Text>
      <Box
        marginTop={"50px"}
        display={"grid"}
        gridTemplateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={"70px"}
        margin={{ base: "30px 20px", sm: "30px 60px" }}
      >
        {allFreeDataGet &&
          allFreeDataGet.map((ele, index) => {
            return <FreeCart data={{ ele, handleDelete, updateFreeForm }} />;
          })}
      </Box>
    </>
  );
}

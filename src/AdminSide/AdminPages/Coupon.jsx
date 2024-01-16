import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { AdminNavbar } from "../adminComponents/AdminNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { SingleCoupon } from "../adminComponents/SingleCoupon";
import { baseUrl } from "../../BaseUrl";

export function Coupon() {
  // let baseUrl = "https://breakable-dirndl-yak.cyclic.cloud/";
  // let baseUrl = "https://backend.defencepost.in";
  // let baseUrl = "http://localhost:8000";

  

  let toast = useToast();
  const [localFormData, setLocalFormData] = useState({});
  const [couponData, setCouponData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateValues, setUpdateValues] = useState({});

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

  //   handle input
  const handleInput = async (event) => {
    const { name, value } = event.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
  };

  //   handle coupon submit

  let handleCouponSubmit = (e) => {
    e.preventDefault();
    postCouponData();
  };

  async function postCouponData() {
    try {
      let couponData = await axios.post(`${baseUrl}/coupon/add`, localFormData);
      if (couponData.status == 200) {
        toast({
          title: "Coupon Added",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        getAllCouponData();
      }
    } catch (err) {
      alert(err);
    }
  }

//   get all coupon data 
  async function getAllCouponData() {
    try {
      let allCouponData = await axios.get(`${baseUrl}/coupon/`);
      setCouponData(allCouponData.data);
    } catch (err) {
      alert(err);
    }
  }


// Delete coupon 
let deleteCoupon = async(id)=>{
    try{
      const userResponse = window.confirm(
        "Are you sure you want to delete coupon?"
      );
      if (userResponse) {
        let deleteData = await axios.delete(`${baseUrl}/coupon/delete/${id}`)
        if (deleteData.status === 200) {
            toast({
              title: deleteData.data.msg,
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "top",
            });
            getAllCouponData()
        }
      }
    }catch(err){
        alert(err)
    }
}
// take values from single componant for update 
let catchValues = (ele) => {
    console.log(ele);
    setUpdateValues(ele);
    setShowUpdateForm(true)
}
// Update coupon 
let updateCoupon = async(e)=>{
    e.preventDefault()
    try{
        let updateData = await axios.patch(`${baseUrl}/coupon/patch/${updateValues._id}`,updateValues)
        if (updateData.status === 200) {
            toast({
              title: updateData.data.msg,
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "top",
            });
            getAllCouponData();
            setShowUpdateForm(false)
        }
    }catch(err){
        alert(err)
    }
}


  useEffect(() => {
    getAllCouponData();
  }, []);

  return (
    <>
      <AdminNavbar />
      <Box mt={"50px"} display={"flex"} justifyContent={"center"} gap={"20px"}>
        <Button backgroundColor={"#00acee"} color={"white"} fontWeight={"500"} onClick={()=>{
            setShowUpdateForm(false)
            setShowAddForm(!showAddForm)
        }}>
          {showAddForm ? "Hide Add Form" : "Show Add Form"}
        </Button>
        <Button backgroundColor={"#00acee"} color={"white"} fontWeight={"500"} onClick={()=>{
            setShowAddForm(false)
            setShowUpdateForm(!showUpdateForm)
        }}>
          {showUpdateForm ? "Hide update form" : "Show update Form"}
        </Button>
      </Box>

      {showAddForm && (
        <Box mt={"50px"}>
          <Text fontSize={"35px"} fontWeight={"bold"} mb={"30px"}>
            Create Coupon
          </Text>
          <Box
            width={{
              base: "100%",
              md: "50%",
              lg: "40%",
            }}
            m={"auto"}
          >
            <form style={{ textAlign: "left" }} onSubmit={handleCouponSubmit}>
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                Coupon*
              </label>
              <input
                style={inputStyle}
                required
                onChange={handleInput}
                name="coupon"
                type="text"
                accept="video/*, .pdf"
                placeholder="Coupan"
                multiple
              ></input>

              {/* student discount  */}
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                Student Discount*
              </label>
              <input
                style={inputStyle}
                required
                onChange={handleInput}
                name="studentDiscount"
                type="text"
                accept="video/*, .pdf"
                placeholder="Student Discount"
                multiple
              ></input>

              {/* student discount  */}
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                Promoter Commission*
              </label>
              <input
                style={inputStyle}
                required
                onChange={handleInput}
                name="promoterCommission"
                type="text"
                accept="video/*, .pdf"
                placeholder="Promoter Commission"
                multiple
              ></input>

              {/* Submit button  */}
              <input
                style={button}
                type="submit"
                value={"Create Coupon"}
              ></input>
            </form>
          </Box>
        </Box>
      )}


      {/* update form  */}
      {showUpdateForm && (
        <Box mt={"50px"}>
          <Text fontSize={"35px"} fontWeight={"bold"} mb={"30px"}>
            Update Coupan
          </Text>
          <Box
            width={{
              base: "100%",
              md: "50%",
              lg: "40%",
            }}
            m={"auto"}
          >
            <form style={{ textAlign: "left" }} onSubmit={updateCoupon}>
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                Coupan*
              </label>
              <input
                style={inputStyle}
                required
                onChange={(e)=>{
                    setUpdateValues({...updateValues,coupon : e.target.value})
                }}
                name="coupon"
                type="text"
                accept="video/*, .pdf"
                placeholder="Coupan"
                value={updateValues.coupon}
              ></input>

              {/* student discount  */}
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                Student Discount*
              </label>
              <input
                style={inputStyle}
                required
                onChange={(e)=>{
                    setUpdateValues({...updateValues,studentDiscount : e.target.value})
                }}
                name="studentDiscount"
                type="text"
                accept="video/*, .pdf"
                placeholder="Student Discount"
                value={updateValues.studentDiscount}
              ></input>

              {/* student discount  */}
              <label
                htmlFor=""
                style={{
                  alignItems: "left",
                  fontSize: "20px",
                  marginLeft: "2px",
                }}
              >
                Promoter Commission*
              </label>
              <input
                style={inputStyle}
                required
                onChange={(e)=>{
                    setUpdateValues({...updateValues,promoterCommission : e.target.value})
                }}
                name="promoterCommission"
                type="text"
                accept="video/*, .pdf"
                placeholder="Promoter Commission"
                value={updateValues.promoterCommission}
              ></input>

              {/* Submit button  */}
              <input
                style={button}
                type="submit"
                value={"Update Coupon"}
              ></input>
            </form>
          </Box>
        </Box>
      )}

      {/* show all coupons  */}

      <Box mb={"50px"} mt={"50px"}>
        <Text fontSize={"35px"} fontWeight={"bold"} mt={"50px"}>
          All Coupons
        </Text>
        {couponData &&
          couponData.map((ele, index) => {
            return <SingleCoupon data={{ele,deleteCoupon,catchValues}} />;
          })}
      </Box>
    </>
  );
}

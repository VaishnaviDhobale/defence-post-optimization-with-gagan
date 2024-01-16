import { Box,Text} from "@chakra-ui/react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";


export function SingleCoupon({ data }) {
  let { coupon, studentDiscount, promoterCommission,promoterAmount,studentsCount} = data.ele;
  let {ele,deleteCoupon,catchValues} = data;

  // function for only three values after point in promoter commision 
  let roundToDecimalPlaces = (value, decimalPlaces) => {
    return Number(value.toFixed(decimalPlaces));
  };

  return (
    <>
      <Box textAlign={"left"} paddingLeft={"20px"}>
        <Text mt={"20px"}><span style={{fontSize : "20px",fontWeight:"bold"}}>Coupon:</span> {coupon}</Text>
        <Text><span style={{fontSize : "20px",fontWeight:"bold"}}>Student Discount:</span> {studentDiscount}%</Text>
        <Text><span style={{fontSize : "20px",fontWeight:"bold"}}>Total Students:</span> {studentsCount}</Text>
        <Text><span style={{fontSize : "20px",fontWeight:"bold"}}>Promoter Commission:</span> {promoterCommission}%</Text>
        <Text mb={"21px"}><span style={{fontSize : "20px",fontWeight:"bold"}}>Promoter Total Amount:</span> {roundToDecimalPlaces(promoterAmount,3)}Rs</Text>
        <Box display={"flex"} gap={"10px"}cursor={"pointer"} width={"200px"} mb={"10px"} >
        <BiSolidMessageSquareEdit onClick={()=>{
            catchValues(ele)
          }} color="#00acee" size={"25px"} />
          <AiFillDelete onClick={()=>{
            deleteCoupon(ele._id)
          }} color="red" size={"25px"}/>
        </Box>
        <hr/>
      </Box>
    </>
  );
}

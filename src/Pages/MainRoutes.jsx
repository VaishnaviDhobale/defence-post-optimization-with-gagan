import {Route,Routes} from "react-router-dom"
import { Home } from "./Home"
import { Post } from "./Post"
import { Login } from "./Login"
import { SignUp } from "./SignUp"
import { Course } from "./Course"
import { SinglePostPage } from "./SinglePostPage"
import { AdminHome } from "../AdminSide/AdminPages/AdminHome"
import { AdminPost } from "../AdminSide/AdminPages/AdminPost"
import { AdminCourse } from "../AdminSide/AdminPages/AdminCourse"
import { AdminFree } from "../AdminSide/AdminPages/AdminFree"
import { AdminSignUp } from "../AdminSide/AdminPages/AdminSignUp"
import { ViewDetails } from "./ViewDetails"
import { Free } from "./Free"
import { Coupon } from "../AdminSide/AdminPages/Coupon"
import { Data } from "./Data"
import { ForgotPassword } from "../components/ForgotPassword"
import { ResetPassword } from "../components/ResetPassword"
import { ViewFreeData } from "./ViewFreeData"
import { MyCourse } from "./MyCourse"
import { MyCourseDetails } from "./MyCourseDetails"
import PdfViewer from "../components/PdfViewer"
import { AdminAddCourse } from "../AdminSide/AdminPages/AdminAddCourse"

// import {Box} from "@chakra-ui/react"

export function MainRoutes(){
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/posts" element={<Post/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/course" element={<Course/>}/>
                <Route path="/free" element={<Free/>}/>
                <Route path="/dataHub" element={<Data/>}/>
                <Route path="/forgotpassword" element={<ForgotPassword />}/>
                <Route path="/forgot-password/:id/:token" element={<ResetPassword />}/>
                <Route path="/singlepostpage/:postId/:index" element={<SinglePostPage />}/>
                <Route path="/viewdetails/:courseId" element={<ViewDetails />}/>
                <Route path="/viewfreedata/:freeDataId" element={<ViewFreeData />}/>
                <Route path="/mycourse" element={<MyCourse/>}/>
                <Route path="/mycoursedetail/:id/:courseId" element={<MyCourseDetails/>}/>
                <Route path="/previewPdf/:link" element={<PdfViewer/>}/>
                
                {/* Admin Routes  */}
                {/* <Route path="/adminhome" element={<AdminHome />}/>
                <Route path="/adminpost" element={<AdminPost />}/>
                <Route path="/admincourse" element={<AdminCourse />}/>
                <Route path="/adminaddcourse" element={<AdminAddCourse />}/>
                <Route path="/adminfree" element={<AdminFree />}/>
                <Route path="/adminsignup" element={<AdminSignUp />}/>
                <Route path="/coupon" element={<Coupon />}/> */}

            </Routes>
        </>
    )
}
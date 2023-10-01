import express from "express";
import {GetAllStudetnt} from "../controller/studentController.js";
import {studentPhotoMulter} from "../utils/multer.js"


//init express
const router = express.Router();


//route
router.post("/student", studentPhotoMulter, GetAllStudetnt);


//default router
export default router;
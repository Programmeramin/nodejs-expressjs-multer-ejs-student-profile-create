import express from "express";
import {GetAllCustomer} from "../controller/customerController.js";
import {customerPhotoMulter} from "../utils/multer.js";


//init express
const router = express.Router();


//route
router.post("/customer",customerPhotoMulter, GetAllCustomer);


//default router
export default router;
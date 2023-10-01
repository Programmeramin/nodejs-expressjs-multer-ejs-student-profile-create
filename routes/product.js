import express from "express";
import {GetAllProduct, 
    CreateProduct,
    singleProduct,
    DeleteProduct,
    showProductPage,
    createProductPage,
    showSingleProductPage,
    editProductPage,
    updateProduct
} from "../controller/productController.js";
import {productPhotoMulter,} from '../utils/multer.js';

//init express
const router = express.Router(); 

//EJS Route
router.get("/", showProductPage);
router.get("/create", createProductPage, );
router.get("/single/:id", showSingleProductPage);
router.get("/edit/:id", editProductPage);
router.post("/update/:id",productPhotoMulter, updateProduct);

//apiroute
router.get("/product", GetAllProduct);
router.get("/product/:slug", singleProduct);
router.get("/product-delete/:id", DeleteProduct);
router.post("/product",productPhotoMulter, CreateProduct,);
  

//default router
export default router;
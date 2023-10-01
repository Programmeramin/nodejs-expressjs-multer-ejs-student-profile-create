import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import studentRouter from "./routes/student.js";
import customerRouter from "./routes/customer.js";
import productRouter from "./routes/product.js";
import expressEjsLayouts from "express-ejs-layouts";
//environment var
dotenv.config();
const PORT = process.env.PORT || 6006;

//init express
const app = express(); 

// ejs set
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

//use express middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
 

//static folder
app.use(express.static("public"));


// router
 app.use(studentRouter);
 app.use(customerRouter);
 app.use(productRouter);
  
//listent server
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`.bgGreen.black);
})  
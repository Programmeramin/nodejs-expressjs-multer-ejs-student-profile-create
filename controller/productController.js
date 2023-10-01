import {generateRandomId,} from "../helper/helper.js";
import fs from "fs";
import nodemailer from "nodemailer";
import axios from "axios";
/**
 * Get All Product
 */

export const GetAllProduct = (req, res) =>{
    
    const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

    if(productData.length === 0){
        res.status(200).json({message : 'No Product Data'});
    }
    
    res.status(200).json({
        product : productData,
        message : 'All product'})
}
 

/**
 * Get single Product
 */

export const singleProduct = (req, res) =>{
    
    const {slug} = req.params;

    const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

    const singleproduct = productData.find((data) => data.slug === slug);

  
    res.status(200).json(singleproduct)
}

 
/**
 * Delete product data 
 */

 export const DeleteProduct = (req, res) =>{
      
    const {id} = req.params;

    const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

   const updatedata = productData.filter(data => data.id !== id);

   productData.push(updatedata)
   
   fs.writeFileSync("db/product.json", JSON.stringify(updatedata))
  
    res.redirect("/")
}

 
//Create product page

export const CreateProduct = async (req, res) =>{
    
   const {name, age, skill, gender, phone, email} = req.body;


   const transport = nodemailer.createTransport({

    host : process.env.MAIL_HOST,
    port : process.env.MAIL_PORT,
      
    auth : {
        user : process.env.MAIL_ADDRESS,
        pass : process.env.MAIL_PASS
        
    },

   
});

console.log(process.env.MAIL_PASS); 


await transport.sendMail({
    from : `MERN STACK COMMUNITY <${process.env.MAIL_ADDRESS}>`,
    subject : 'MERN STACK COMMUNITY',
    to  : req.body.email,
    text : `Hello ${req.body.name}, You are ${req.body.age} Years old you are ${req.body.skill}`,

    

    html : `
    
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Template</title>

<style>

   .container{
    width: 600px;
    height: 500px;
    margin: auto;
    margin-top: 100px;
   }

   .email-body{
    width: 90%;
    text-align: center;
    
   }

   .email-logo img{
    width: 200px;
    height: 150px;
   }

   .email-body P{
    color:white;
    background-color: rgb(0, 37, 248);
    font-size: 30px;
    align-items: center;
    
   }

   h5{
    font-size: 20px;
    align-items: left;
   }

   .email-body a{
    font-size: 30px;
    color: rgb(255, 123, 0);
    margin-right: 10px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   }
  
</style>
</head>
<body>

<div class="container">
<div class="email-body">

   

    <div class="email-logo">
        <img src="https://miro.medium.com/v2/resize:fit:678/0*kxPYwfJmkXZ3iCWy.png" alt="">
    </div>

    <h1>Hello, ${req.body.name}</h1>
    <h2>You are ${req.body.age} Years old</h2>
    <h3>Skill : ${req.body.skill}</h3>



    <p>Your Are Wellcome by MERN STACK Developer Community Group</p>

    <h5>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem corrupti atque ipsam corporis, aliquid laudantium! Labore necessitatibus eligendi quas recusandae?</h5>

    <hr>

    <a href="#"><i class="fa-brands fa-facebook"></i></a>
    <a href="#"><i class="fa-brands fa-instagram"></i></a>
    <a href="#"><i class="fa-brands fa-linkedin"></i></a>
 
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>
    
    `

    

});


    axios.get(
          `http://bulksmsbd.net/api/smsapi?api_key=3a5g6eeIJ1ElcqKbyuFe&type=text&number= ${req.body.phone}&senderid=8809617612994&message= HI ${req.body.name}, You are ${req.body.age} Years old and you are a ${req.body.skill} Expert, Our DEVELOPER Community to Your account created successfully. So, use fully free`
    );

    
   // product name regularPrice required
   if(!name || !age || !phone || !email || !gender){
    res.status(400).json({Message : "All Field Are Required"});
    return;
   }



  // product data send json file
      const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

      const product  = {
        id : generateRandomId(),
        name,
        age,
        skill,
        gender,
        phone,
        email,
        photo : req.file.filename,
      } 

      productData.push(product);



      fs.writeFileSync("db/product.json", JSON.stringify(productData));

     
 

      
    res.redirect("/")
}
 

// show product page
export const showProductPage = (req, res) =>{

    const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

    res.render("product", {
        product : productData,
    });
};

// create product page
export const createProductPage = (req, res) =>{

    res.render("create");
};
 

// Single show product page
export const showSingleProductPage = (req, res) =>{

    const {id} = req.params;

const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

    const singlePruduct = productData.find((data) => data.id === id);

    res.render("show", {
        product : singlePruduct,
    });
};

// edit product page
export const editProductPage = (req, res) =>{

    const {id} = req.params;

    //get all data
    const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

    const editProduct = productData.find((data) => data.id === id);


    res.render("edit",{
        product : editProduct,
    });
};


//Update product submit

export const updateProduct = (req, res) =>{

    const {id}  = req.params;

    const {
        name, 
        age, 
        skill, 
        gender, 
        phone, 
        email,} = req.body;

   //get all data
   const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

   //photo manage
   let photo_name = productData[productData.findIndex(data => data.id === id)].photo;

   if(req ?.file ?.filename){
    photo_name = req.file.filename;
   }
   

   productData[productData.findIndex(data => data.id === id)] = {
    id : id,
    name, 
    age, 
    skill, 
    gender, 
    phone, 
    email,
    photo : photo_name,
   }

   fs.writeFileSync("db/product.json", JSON.stringify(productData));
   res.redirect('/')

}



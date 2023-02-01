const express = require("express");
const Joi = require("joi");
const multer = require("multer");
const Product = require("../models/Product");
const Auth = require("../middleware/Auth");
const isInt = require("../utils/isInt");
const Category = require("../models/Category");
const Admin = require("../middleware/Admin");

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storageConfig });

const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await Product.findAll({});
  res.render("products/products", { products });
});
router.get("/products/new", Auth , Admin, async (req, res) => {
  const categories = await Category.findAll({})  
  res.render("products/new" , {categories});
});
router.post("/products", Auth, Admin, upload.single("image"), async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().positive(),
    description: Joi.string().required(),
    quantity: Joi.number().required().positive(),
    category:Joi.number().required()
  });
  const { name, price, description, quantity , category } = req.body;
  const { error, value } = schema.validate({
    name: name,
    price: price,
    description: description,
    quantity: quantity,
    category:category
  });
  if (error) return res.status(403).send(error.message);

  const product = await Product.create({
    name,
    price,
    description,
    quantity,
    image_src: req.file.path,
    categoryId:category
  });
  if (!product) return res.send("Error 400");

  res.redirect("/products/new");
});
router.get("/products/ms" , Auth, Admin, async(req,res)=>{
  const products = await Product.findAll({include:[Category]});
  res.render("products/manage-product" , {products})
})
router.get("/products/:id", async (req, res) => {
    const result = isInt(req.params.id)
    if(!result) return res.render("404")
    const product = await Product.findByPk(req.params.id , {include:Category})
    const relatedProducts = await Product.findAll({where:{categoryId:product.categoryId}})
    res.render("products/products-details" , {product , relatedProducts})
});
router.get("/products/:id/edit" , Auth , Admin, async (req, res) => {
  const categories = await Category.findAll({})
  const product = await Product.findByPk(req.params.id);
  res.render("products/edit", { product , categories });
});
router.patch("/products/:id" , Auth, Admin ,upload.single('image') , async(req,res)=>{
    let newImage;
    if(req.file){
      newImage = req.file.path
      await Product.update({
        name:req.body.name , 
        price:req.body.price , 
        description:req.body.description , 
        quantity:req.body.quantity,
        image_src:newImage,
        categoryId:req.body.category
      } , 
  
        {where:{id:req.params.id}}).then(()=>{
  
        res.redirect("/products/ms")
      })

    }else{

      // console.log(req.file);
      await Product.update({
        name:req.body.name , 
        price:req.body.price , 
        description:req.body.description , 
        quantity:req.body.quantity,
        categoryId:req.body.category
      } , 
  
        {where:{id:req.params.id}}).then(()=>{
  
        res.redirect("/products/ms")
      })
    }

})
router.delete("/products/:id",async(req,res)=>{
 const product=await Product.findByPk (req.params.id)
 await product.destroy()
 res.redirect("/products/ms")

})



module.exports = router;

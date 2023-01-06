const express = require("express")
const Joi = require("joi")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

const router = express.Router()

router.get("/login" , async(req,res)=>{
    res.render("account")
})
router.post("/signup" , async(req,res)=>{
    const schema = Joi.object({
        username:Joi.string().required(),
        email:Joi.string().required(),
        password:Joi.string().required().min(6)
    })
    const {error , value} = schema.validate(req.body)
    if (error) return res.status(403).send(error.message)
    const hashedPassword = await bcrypt.hash(value.password , 12)
    // console.log(hashedPassword);
    User.create({username:value.username , email:value.email , password:hashedPassword}).then(()=>{
        res.redirect("/")
    }).catch((err)=>{
        console.log(err);
    })
})

router.post("/login" , async(req,res)=>{
    
    const schema = Joi.object({
        email:Joi.string().required(),
        password:Joi.string().required().min(6)
    })
    const {error , value} = schema.validate(req.body)
    console.log(error);
    if (error) return res.status(403).send(error.message)

    const user = await User.findOne({ attributes:{exclude:['createdAt' , 'updatedAt']},where:{email:value.email}})

    if(!user) return res.status(404).send("invalid user email")

    const compareHashPassword = await bcrypt.compare(value.password , user.password)

    if(!compareHashPassword) return res.send(401).send("invalid password")
    req.session.user = {id:user.id , role:user.Role}
    req.session.isAuthenticated = true
    
    console.log(req.session.user);
    res.redirect("/products")
})
router.get("/logout" , async(req,res)=>{
    req.session.isAuthenticated = false
    res.locals.role = 'Customer'
    res.redirect("/")
})


// admin crud routes
router.get("/users" , async(req,res)=>{})
router.post("/users" , async(req,res)=>{})
router.get("/users/:id" , async(req,res)=>{})
router.get("/users/:id/edit" , async(req,res)=>{})
router.patch("/users/:id" , async(req,res)=>{})
router.delete("/users/:id" , async(req,res)=>{})
module.exports = router
const express = require("express")
const router = express.Router()

router.get("/orders" , async(req,res)=>{})
router.post("/orders" , async(req,res)=>{})
router.get("/orders/:id" , async(req,res)=>{})
router.get("/order/:id/edit" , async(req,res)=>{})
router.patch("/order/:id" , async(req,res)=>{})
router.delete("/order/:id" , async(req,res)=>{})
//display order list for a particular user
router.get("/orders/:id/user" , async(req,res)=>{})

module.exports = router
const express = require("express")
const Order = require("../models/Order")
const User = require("../models/User")
const Product = require("../models/Product")
const router = express.Router()

router.get("/orders" , async(req,res)=>{
    
    const orders = await Order.findAll({include:[Product , User]})
    res.render("orders/index" , {orders})
})
router.get("/orders/new" , async(req,res)=>{
    const products = await Product.findAll();
    const users = await User.findAll();
    res.render("orders/new" , {products , users});
})
router.post("/orders" , async(req,res)=>{
    await Order.create(req.body)
    res.redirect("/orders")
})
router.get("/orders/:id" , async(req,res)=>{
    const order = await Order.findByPk(req.params.id)
    res.render("orders/show")
})
router.get("/orders/:id/edit" , async(req,res)=>{
    const order = await Order.findByPk(req.params.id);
    const users = await User.findAll()
    const products = await Product.findAll({});
    res.render("orders/edit" , { users, order , products})
    
})
router.patch("/orders/:id" , async(req,res)=>{
    const order = await Order.update(req.body, {where:{id:req.params.id}})
    res.redirect("/orders")
})
router.delete("/orders/:id" , async(req,res)=>{
    const order = await Order.findByPk(req.params.id)
    order.destroy().then(()=>{
        res.redirect("/orders")
    }).catch((err)=>{
        res.send("<h1>Error 500</h1>")
    })
})
//display order list for a particular user
router.get("/orders/:id/user" , async(req,res)=>{})

module.exports = router
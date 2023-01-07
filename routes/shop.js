const express = require("express")
const Auth = require("../middleware/Auth")
const Cart = require("../models/Cart")
const Order = require("../models/Order")
const Product = require("../models/Product")

const router = express.Router()

router.get("/cart" , Auth , async(req,res)=>{
    let subtotal = 0
    const userId = req.session.user.id
    const cartItems = await Cart.findAll({ include:[Product], where:{userId:userId}})
    cartItems.map(cart=>{
        subtotal = subtotal + cart.product.price * cart.quantity
    })
    res.render("shop/cart" , {cartItems , subtotal})
})
router.post("/cart/new" , Auth, async(req,res)=>{

    const {quantity , productId} = req.body
    const userId = req.session.user.id
    const existingProduct = await Cart.findOne({where:{productId:productId , userId:userId}})

    if(existingProduct){
        existingProduct.quantity += +quantity 
        existingProduct.save()
        return res.redirect(`/products/${productId}`)
    }

    await Cart.create({userId:userId , productId:productId , quantity:quantity})

    res.redirect(`/products/${productId}`)
    

})
router.get("/carts" , Auth , async(req,res)=>{
    let subtotal = 0
    const userId = req.session.user.id
    const cartItems = await Cart.findAll({ include:[Product], where:{userId:userId}})
    res.status(200).json(cartItems)
})
router.post("/update" , async(req,res)=>{
    const {id , quantity} = req.body
    const result = await Cart.update({quantity} , {where:{id:+id}})
    if(!result) return res.send(400).json("forbbiden request/operation")
    res.json({message:"updated"})

    
})
router.post("/order" , async(req,res)=>{
        // Promise.all(req.body.map(async(item)=>{
        //     const order = await Order.findAll({where:{productId:item.productId , userId:item.userId}})
        //     console.log(order);
        //     if(order.length>0) {
        //         return console.log("order exists");
        //     }   
        // }))

        const result = await Order.bulkCreate(req.body)
        if(!result) return res.status(400).json({message:"Forbidden"})
        Promise.all(result.map(async(order)=>{
            const product = await Product.findByPk(order.productId)
            product.quantity = product.quantity - +order.quantity;
            await product.save();
        }))
        const carts = await Cart.findAll({where:{userId:res.locals.userId}})
        Promise.all(carts.map(async(cart)=>{
            await cart.destroy()
        }))
        res.json({message:"done"})
    
})

router.get("/orders/:id/user" , async(req,res)=>{
    const orders = await Order.findAll({ include:[Product], where:{userId:req.params.id}})
    // console.log(orders);
    res.render("orders/user-order" , {orders})
})
router.get("/cart/:id/remove" , async(req,res)=>{
    const cart = await Cart.findByPk(req.params.id)
    await cart.destroy()
    res.redirect("/cart")
    
})
module.exports = router

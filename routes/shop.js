const express = require("express")
const Auth = require("../middleware/Auth")
const Cart = require("../models/Cart")
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
    const existingProduct = await Cart.findOne({where:{productId:productId}})

    if(existingProduct){
        existingProduct.quantity += +quantity 
        existingProduct.save()
        return res.redirect(`/products/${productId}`)
    }

    await Cart.create({userId:userId , productId:productId , quantity:quantity})

    res.redirect(`/products/${productId}`)
    

})
router.get("/cart/:id/remove" , async(req,res)=>{
    const cart = await Cart.findByPk(req.params.id)
    await cart.destroy()
    res.redirect("/cart")
    
})
module.exports = router

const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function checkNull(req,res,next){

    const products = await Product.findAll({where:{categoryId:null}})
    if(products.length<=0){
        return next()
    }
    if(products>0){
        Promise.all(products.map(async(product)=>{
            await product.destroy()
        }))

        next()
    }

    const carts = await Cart.findAll({where:{productId:null , userId:null}})

    if(carts.length<=0){
        return next()
    }
    if(carts.length>0){

        Promise.all(carts.map(async(cart)=>{
            await cart.destroy()
        }))

        return next()

    }

}

module.exports = checkNull
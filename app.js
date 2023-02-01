require("dotenv").config()
const express = require("express")
const methodOverride = require('method-override')
const session = require("express-session")
const sequelize = require("./database/conn")
const productsRoutes = require("./routes/products")
const usersRoutes = require("./routes/users")
// const shopRoutes = require("./routes/shop")
// const orderRoutes = require("./routes/orders")
// const User = require("./models/User")
const Product = require("./models/Product")
const Category = require("./models/Category")
// const Order = require("./models/Order")
const cors = require("cors")
// const Cart = require("./models/Cart")
const checkNull = require("./middleware/checkNull")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(express.json())
app.use(function(req,res,next){
    if(!req.session.user){
        return next()
    }

    res.locals.role = req.session.user.role
    res.locals.isAuth = req.session.isAuthenticated
    res.locals.userId = req.session.user.id
    next()
})
app.set('view engine' , 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(checkNull)
app.use(productsRoutes)
app.use(usersRoutes)
// app.use(shopRoutes)
// app.use(orderRoutes)


app.get("/" , async(req,res)=>{
    const products = await Product.findAll({limit:3});
    const latest = await Product.findAll({limit:3,order:[
        ['createdAt' , 'DESC']
    ]})
    
    res.render("index" , {products, latest})
})

app.get("/contact" , async(req,res)=>{
    res.render("contact")
})

app.get("*" , (req,res,error)=>{
    res.render("404")
})

Category.hasMany(Product , {onDelete:'CASCADE'})
Product.belongsTo(Category)
// Product.hasMany(Cart)
// Cart.belongsTo(Product)
// User.hasMany(Cart)
// Cart.belongsTo(User)
// Product.hasMany(Order)
// Order.belongsTo(Product)
// User.hasMany(Order)
// Order.belongsTo(User)

sequelize.sync({force:false})
app.listen(3000 || process.env.PORT, ()=>{
    console.log("Server Started at http://localhost:3000");
})
 
 


 
  



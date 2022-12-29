require("dotenv").config()
const express = require("express")
const methodOverride = require('method-override')
const session = require("express-session")
const sequelize = require("./database/conn")
const productsRoutes = require("./routes/products")
const usersRoutes = require("./routes/users")
const shopRoutes = require("./routes/shop")
const User = require("./models/User")
const Product = require("./models/Product")
const Category = require("./models/Category")
const cors = require("cors")
const Cart = require("./models/Cart")
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

    next()
})
app.set('view engine' , 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(productsRoutes)
app.use(usersRoutes)
app.use(shopRoutes)

app.get("/" , async(req,res)=>{
    res.render("index")
})


Category.hasMany(Product)
Product.belongsTo(Category)
Product.hasMany(Cart)
Cart.belongsTo(Product)
User.hasMany(Cart)
Cart.belongsTo(User)
sequelize.sync({force:false})
app.listen(3000 , ()=>{
    
    console.log("Server Started at http://localhost:3000");
})
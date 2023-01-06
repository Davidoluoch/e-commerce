module.exports = function isAdmin(req, res , next){
    if(res.locals.role === 'Admin'){
        next()
    }else{
        res.send("Unauthorized")
    }
}
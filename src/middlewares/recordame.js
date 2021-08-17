module.exports = (req,res,next) =>{
    if (req.cookies.remenber !== undefined && req.session.user === undefined) {
        req.session.user = req.cookies.remenber 
    }
    
    next()
}
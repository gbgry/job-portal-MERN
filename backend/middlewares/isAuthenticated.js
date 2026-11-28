const isAuthenticated = async(req, res, next)=>{
    try{
const token = req.cookies.token;
if(!token){
    return res.status(401).json({
        message: "user not available",
        success: false,
    })
}
    }catch(error){
        console.log(error)
    }
};

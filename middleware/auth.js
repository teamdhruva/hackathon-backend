const isAuthenticated =(req,res,next)=>{
    console.log('Session data:', req.session.user);
    if( req.session.user){
        return next();
    }
    res.status(401).json({message:'Unauthorized'});
}
module.exports=isAuthenticated;
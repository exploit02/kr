const looseRoute = [
    '/signin',
    '/test',
    '/users'
];

var Auth = (req, res, next)=>{
    if(req.session.uID || looseRoute.indexOf(req.url) !== -1){
        next();
    }else{
        res.status(401).json({
            Code:-1,
            Success: false,
            Message: "Login to Continue"
        });
    }
}
 
module.exports = Auth;
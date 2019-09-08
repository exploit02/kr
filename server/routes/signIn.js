var express = require('express');
var router = express.Router();
var signIn = require('../models/signIn');

router.post('/', (req, res, next)=>{
    
    signIn.create(req.body.uname, req.body.crunchy)
    .then(data =>{
        if(data.token){
            res.header('Authorization', data.token);
            req.session.uID = data.userData.uId;
            req.session.uName = data.userData.uName;
            req.session.uType = data.userData.uType;
            req.session.eMail = data.userData.eMail;
        }
        
        res.status(data.status).json({
            response: data.response,
            userData: data.userData 
        });

    })
    .catch(error =>{
        console.log(error.message);
    })
})
module.exports = router;
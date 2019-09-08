var express = require('express');
var router = express.Router();

router.get('/', function(req, res,next){
    var response = {
        Success:true,
        Message:"Logged-In User",
        uname:"Srimanta"
    }
    res.status(200).json(response);
  });

module.exports = router;

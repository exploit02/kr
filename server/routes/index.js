var express = require('express');
// var passport = require('passport');
var router = express.Router();
var indexLogin = require('./../models/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Strong The Base' });
});


router.post('/login', function(req, res,next){
  indexLogin.create(req.body.uname, req.body.crunchy)
  .then(function(data){
      res.status(200).json(data);
  })
  .catch(function(error){
      console.log(error.message);
  });
});


module.exports = router;

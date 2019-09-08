var express = require('express');
var router = express.Router();
var users = require('./../models/users');

var bcrypt = require('bcrypt');
const saltRounds = 10;

const { check , validationResult } = require('express-validator');

/* GET users listing. */
router.get(['/', '/:id'], function(req, res, next) {
  console.log(req.query)
  users.read(req.params.id, req.query.pageNumber, req.query.entryInPage, req.query.searchField)
      .then(function (data) {
        res.status(200).send(data);
      })
      .catch(function (error) {
        console.log(error.message);
    });
});

/* POST users listing. */
router.post('/create', [
      check('fname').isString(),
      check('lname').isString(),
      check('uname').isString(),
      check('email_id').isEmail(),
      check('mobile_no').isInt(),
      check('gender').isString()
    ],function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array())
        res.status(400).json({ errors: errors.array() });
     }else{
      req.body.crunchy === undefined || req.body.crunchy === null ? req.body.crunchy = 'DEFAULT' : null;
         bcrypt.hash(req.body.crunchy, saltRounds, function(error, hash){

        users.create(req.body.fname, req.body.user_type_id, req.session.uID, req.session.uID,
          req.body.lname, req.body.uname, req.body.email_id, req.body.mobile_no, req.body.gender,
          req.body.doj, req.body.dob, req.body.supervisor_id, req.body.super_type_id, hash)
            .then(function(data){
              res.status(201).send(data);
            })
            .catch(function(error){
              
              console.log(error.message);
              res.status(404).send(error);
            });
    });
    }
});

/*PUT users listing */

router.put('/update/:id',[
  check('fname').isString(),
  check('lname').isString(),
  check('uname').isString(),
  check('email_id').isEmail(),
  check('mobile_no').isInt(),
  check('gender').isString()
  ],function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).json({ errors: errors.array() });
   }else{
  bcrypt.hash(req.body.crunchy, saltRounds, function(error, hash){

    users.update(req.body.fname,req.body.user_type_id,req.body.updated_by,req.body.lname,req.body.uname, 
      req.body.email_id, req.body.mobile_no, req.body.gender,req.body.doj, req.body.dob, 
      req.body.supervisor_id, req.body.super_type_id, req.params.id, hash)
        .then(function(data){
          res.status(200).send(data);
        })
        .catch(function(error){
          console.log(error);
        });
      });
    }
    });

    /*DELETE useres listing */

    router.delete('/delete/:id', (req, res)=>{
      users.delete(req.params.id)
           .then(function(data){
             res.status(200).send(data);
           })
           .catch(function(error){
            console.log(error);
           });
    });


module.exports = router;

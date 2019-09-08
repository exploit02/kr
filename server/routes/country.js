var express = require('express');
var router = express.Router();
var country = require('./../models/country');

const { check , validationResult } = require('express-validator');

/* POST country listening */
router.post('/create', [
    check('country_name').isString()
], function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
                 res.status(401).json({ errors: errors.array() });
              }else{
                country.create(req.body.country_name,req.body.created_by,req.body.updated_by)
                .then(function(data){
                    res.status(201).send(data);
                })
                .catch(function(error){
                    console.log(error.message);
                }); 
              }

});

/* GET country listening */
router.get(['/', '/:id'], function(req, res,next){
        country.read(req.params.id)
        .then(function(data){
            res.status(200).json(data);
        })
        .catch(function(error){
            console.log(error.message);
        });
});


/* PUT country listening */
router.put('/update', [
        check("country_name").isString()
],function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
                 res.status(401).json({ errors: errors.array() });
              }else{
                country.update(req.body.country_name,req.body.updated_by,req.body.id)
                .then(function(data){
                    res.status(200).send(data);
                })
                .catch(function(error){
                    console.log(error.message);
                });
              }
    
    });

    /* DELETE country listening */
router.delete('/delete', function(req, res, next){
    country.delete(req.body.id, req.body.is_active,req.body.updated_by)
    .then(function(data){
        res.status(200).send(data);
    })
    .catch(function(error){
        console.log(error.message);
    });
    });

module.exports = router;
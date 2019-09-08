var express = require ('express');
var router = express.Router();
var districtModel = require('./../models/district');

const { check , validationResult } = require('express-validator');

/* POST district listing */

router.post('/create', [
    check('district_name').isString(),
    check('district_code').isString().isUppercase(),
    check('state_id').isInt()
], function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() });
    }else{
        districtModel.create(req.body.district_name,req.body.district_code,req.body.state_id,req.body.created_by,req.body.updated_by)
        .then(function(data){
        res.status(201).send(data)
    }) 
    .catch(function(error){
        console.log(error.message);
    });
}
});

/* PUT district listing */
router.put('/update', [
    check('district_name').isString(),
    check('district_code').isString().isUppercase(),
    check('state_id').isInt()
],function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() });
    }else{
    districtModel.update(req.body.id,req.body.district_name,req.body.district_code,req.body.state_id,req.body.updated_by)
                .then(function(data){
                    res.status(200).send(data);
                })
                .catch(function(error){
                    console.log(error.message);
                }); 
              
            }
});

/* GET district listing */

router.get(['/', '/:id'], function(req, res, next){
    districtModel.read(req.params.id)
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((error)=>{
        console.log(error.message);
    });

});

/* DELETE distrct listing */

router.delete('/delete', function(req, res, next){
    districtModel.delete(req.body.id,req.body.is_active,req.body.updated_by)
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((error)=>{
        console.log(error.message);
    });
});



module.exports = router;
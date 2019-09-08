var express = require('express');
var router = express.Router();
var villageModel = require('./../models/village');
const { check , validationResult } = require('express-validator');

/* POST Village listing */
router.post('/create',[
    check('village_name').isString(),
    check('post_ofc_id').isInt()
],function(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).send({ errors: errors.array() });
    }else{
    villageModel.create(req.body.village_name,req.body.post_ofc_id,req.body.created_by,req.body.updated_by)
    .then((data)=>{
        res.status(201).send(data)
    })
    .catch((error)=>{
        console.log(error)
    });
}
});

/* GET village listing */
router.get(['/', '/:id'], function(req, res, next){
    villageModel.read(req.params.id)
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((error)=>{
        console.log(error);
    });
});

/* PUT postoffice listing*/

router.put('/update', [
    check('village_name').isString(),
    check('post_ofc_id').isInt(),
], function(req, res, next){
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).send({ errors: errors.array() })
}else{
    villageModel.update(req.body.village_name,req.body.post_ofc_id,req.body.updated_by,req.body.id)
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((error)=>{
        console.log(error);
    });
}
});

/* DELETE postoffice listing */
router.delete('/delete', function(req, res, next){
    villageModel.delete(req.body.id,req.body.is_active,req.body.updated_by)
    .then(function(data){
        res.status(200).send(data)
    })
    .catch(function(error){
        console.log(error);
    });
});



module.exports = router;
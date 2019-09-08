var express = require('express');
var router = express.Router();
var postoffice = require('./../models/postoffice');

const { check , validationResult } = require('express-validator');

/* POST postoffice listing*/
router.post('/create', [
    check('post_ofc_name').isString(),
    check('policestation_id').isInt(),
    check('pin_number').isInt()
], function(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).json({ errors: errors.array() })
    }else{
    postoffice.create(req.body.post_ofc_name,req.body.pin_number,req.body.policestation_id,req.body.created_by,req.body.updated_by)
    .then((data)=>{
        res.status(201).send(data)
    })
    .catch((error)=>{
        console.log(error);
    });
}
});

/* GET postoffice listing */
router.get(['/', '/:id'], function(req, res, next){
    postoffice.read(req.params.id)
    .then((data)=>{
        res.status(200).send(data)
    })
    .catch((error)=>{
        console.log(error);
    });
});

/* PUT postoffice listing*/

router.put('/update', [
    check('post_ofc_name').isString(),
    check('pin_number').isInt(),
    check('policestation_id').isInt()
], function(req, res, next){
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).send({ errors: errors.array() })
}else{
    postoffice.update(req.body.post_ofc_name,req.body.pin_number,req.body.policestation_id,req.body.updated_by,req.body.id)
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
    postoffice.delete(req.body.id,req.body.is_active,req.body.updated_by)
    .then(function(data){
        res.status(200).send(data)
    })
    .catch(function(error){
        console.log(error);
    });
});




module.exports = router;
var express = require('express');
var router = express.Router();
var state = require('./../models/state');

const { check , validationResult } = require('express-validator');

/* POST state listening */
router.post('/create', [
    check('state_name').isString(),
    check('country_id').isInt(),
    check('state_code').isString().isAlpha().isUppercase()
], function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() });
     }else{
    state.create(req.body.state_name, req.body.country_id, req.body.state_code, req.body.created_by, req.body.updated_by)
    .then(function(data){
        res.status(201).send(data)
    })
    .catch(function(error){
        console.log(error);
    });
     }
});

/* GET State listening */
router.get(['/', '/:id'], function(req, res,next){
    state.read(req.params.id, req.query.pageNumber, req.query.entryInPage)
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(error){
        console.log(error.message);
    });
});

/* PUT state listing */
router.put('/update',[
    check('state_name').isString(),
    check('country_id').isInt(),
    check('state_code').isString().isAlpha().isUppercase()
], function(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).json({ errors: errors.array() });
    }else{
        state.update(req.body.id,req.body.state_name,req.body.country_id,req.body.state_code,req.body.updated_by)
            .then(function(data){
                res.status(200).send(data);
            })
            .catch(function(error){
                console.log(error.message);
            });
    }
                  
});

/* DELETE state listening */
router.delete('/delete', function(req, res, next){
    
    state.delete(req.body.id, req.body.is_active,req.body.updated_by)
    .then(function(data){
        res.status(200).send(data);
    })
    .catch(function(error){
        console.log(error);
    });
    });



module.exports = router;

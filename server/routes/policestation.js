var express = require('express');
var router = express.Router();
var policestation = require('./../models/policestation');

const { check , validationResult } = require('express-validator');

/* POST policestation listing */
router.post('/create',[
    check('police_station_name').isString(),
    check('district_id').isInt()
], function(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).json({ errors: errors.array() })
    }else{
    policestation.create(req.body.police_station_name,req.body.district_id,req.body.created_by, req.body.updated_by)
    .then(function(data){
        res.status(201).send(data);
    })
    .catch(function(error){
        console.log(error);
    });
}
});

/*GET policestation listing */

router.get(['/', '/:id'], function(req, res, next){
    policestation.read(req.params.id)
    .then(function(data){
        res.status(200).send(data)
    })
    .catch(function(error){
        console.log(error);
    });
});

/*PUT policestation listing */

router.put('/update', [
    check('police_station_name').isString(),
    check('district_id').isInt()
], function(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(401).json({ errors: errors.array() })
    }else{
    policestation.update(req.body.id,req.body.police_station_name,req.body.district_id,req.body.updated_by)
    .then(function(data){
        res.status(200).send(data)
    })
    .catch(function(error){
        console.log(error);
    });
    }
});

/*status change policestation listing */

router.delete('/delete', function(req, res, next){
    policestation.delete(req.body.id,req.body.is_active,req.body.updated_by)
    .then(function(data){
        res.status(200).send(data)
    })
    .catch(function(error){
        console.log(error);
    });
});






module.exports = router;
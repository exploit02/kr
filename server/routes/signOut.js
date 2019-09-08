var router = require('express').Router();

router.post('/', (req, res, next)=>{
    req.session.destroy();
    const response = {
        Code: 2,
        Success: true,
        Message:"Successfully Logged Out"
    }
    res.status(200).json(response);

})

module.exports = router;
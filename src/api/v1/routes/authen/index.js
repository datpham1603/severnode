const express = require('express');
const userControler = require('../../controllers/user.controller')
const router = express.Router();

router.post('/register', async (req, res) => {
    const newUser = await userControler.createaccount(req.body);
    console.log(newUser)
    if (newUser != null) {
        res.json({
            "newUser": newUser
        })
    }
    else {
        res.json({
            'message': 'lỗi'
        })
    }
})
router.post('/authenticate', async (req, res) => {
    const newUser = await userControler.login(req.body)
    if (newUser) {
        res.json({
            "message": true,
            'user':newUser
        })
    } else {
        res.json({
            'message': 'lỗi',
            
        })
    }

})

module.exports = router
const express = require('express')
const {signUp, signIn} = require('../controllers/auth.controller.js')

const router = express.Router();

router.get('/test', (req,res) =>{
    res.json({success:"ok"});
})

router.post('/signup',signUp)
router.post('/signin',signIn)



module.exports = router
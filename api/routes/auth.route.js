const express = require('express')
const {signUp} = require('../controllers/auth.controller.js')

const router = express.Router();

router.get('/test', (req,res) =>{
    res.json({success:"ok"});
})

router.post('/signup',signUp)



module.exports = router
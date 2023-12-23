const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const authRouter = require('./routes/auth.route.js')
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;


app.use(express.json())

app.use('/api/auth/',authRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
  


const express = require('express');
const cors =require("cors");
const useRouter = require('./routes/user.routes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user',useRouter);
module.exports=app;
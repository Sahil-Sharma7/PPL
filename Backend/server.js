var express = require('express')
var app = express();
var router = require('./Router/router');
var cors = require('cors');

app.use(cors())

app.use('/',router)
app.use(express.static('uploads'))
app.listen(8888,()=>{
    console.log('port is running at 1111')
})
// var express = require('express')
// var router = express.Router();
// const bodyParser=require("body-parser")
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }))
const mongoos1 = require('mongoose')
const New_Collection = require('../Schemas/userSchema');
mongoos1.connect('mongodb://localhost:27017/Users',{useNewUrlParser: true, useUnifiedTopology: true});
module.exports = {
    Registeruser : async function(email_entered)
    {
        console.log('email recieved is ',email_entered)
        let email_in_db = await New_Collection.findOne({'email':email_entered})
        console.log('email in db contains',email_in_db)
        return email_in_db
    },
    Loginuser : async function(Body) {
        const email1 = Body.email
        var a = await New_Collection.findOne({'email':email1})
    if(a){
        if(Body.password === a.password){
            return('Sucessfully Logged in');
        }
        else{
            return('Password does not match')
        }
    }
    else{
        return('Account does not exist')
    }
        
    }
}
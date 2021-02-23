var express = require("express");
const crypto = require("crypto");
var router = express.Router();
const externals = require('../config')
const multer = require("multer");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoos1 = require("mongoose");
const New_Collection = require("../Schemas/userSchema");
const Image_Collection = require("../Schemas/imageSchema");
mongoos1.connect("mongodb://localhost:27017/Users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var Userapi = require("../Api/Userapi");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

router.get("/Login", (req, res) => {
  Image_Collection.find().then((response) => {
    res.json(response);
  });
});
router.post("/Image_Detail", async (req, res) => {
  let image_in_db = await Image_Collection.findOne({ _id: req.body.id });
  res.json(image_in_db);
});

// this is for registration
router.post("/Register", async (req, res) => {
  let email_entered = req.body.email;

  let email_in_db = await Userapi.Registeruser(email_entered);
  if (email_in_db) {
    res.json("Email Already Regestered");
  } else {
    New_Collection.create(req.body);

    res.send("User Created Sucessfully");
  }
});

router.post("/Login", async (req, res) => {
  let result = await Userapi.Loginuser(req.body);
  res.send(result);
});
router.post("/Liked", async (req, res) => {
  let ID = req.body.id;
  let EMAIL = req.body.email;
  
  let result_liked_query = await Image_Collection.find({ _id: ID }).then(
    (response) => {
      const Result_from_likes = response[0].Likes.includes(EMAIL);

      if (Result_from_likes === true) {
        Image_Collection.updateOne(
          { _id: ID },
          { $pullAll: { Likes: [req.body.email] } }
        ).then((response) => {});
        Image_Collection.updateOne(
          { _id: ID },
          { $inc: { Count: -1 } }
        ).then((re) => {});

        Image_Collection.findOne({ _id: ID }).then((response) => {
          res.json(response.Count);
        });
      } else {
        Image_Collection.updateOne(
          { _id: ID },
          { $push: { Likes: [req.body.email] } }
        ).then((response) => {});
        Image_Collection.updateOne(
          { _id: ID },
          { $inc: { Count: 1 } }
        ).then((re) => {});
        Image_Collection.findOne({ _id: ID }).then((response) => {
          res.json(response.Count);
        });
      }
    }
  );
});
router.post("/Commented", (req, res) => {
  Image_Collection.updateOne(
    { _id: req.body.id },
    {
      $push: {
        Comment: {
          Text: req.body.comment,
          Name: req.body.email,
        },
      },
    }
  ).then((response) => {
    Image_Collection.findOne({ _id: req.body.id }).then((res1) => {
      res.json(res1.Comment);
    });
  });
});

router.post("/Image", upload.single("file_name"), (req, res, next) => {
  var fileinfo = req.file;

  Image_Collection.create({
    file_name: fileinfo.originalname,
    Description: req.body.Description,
    Category: req.body.Category,
    Created_At: req.body.Created_At,
    Creation_Time: req.body.Creation_Time,
    Email: req.body.Email,
  }).then((response) => {
    res.json();
  });
});

router.post("/forgetPassword", (req, res) => {
  New_Collection.findOne({ email: req.body.Email }).then((user) => {
    if (user === null) {
      res.json("email not in database");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      New_Collection.updateOne(
        { email: user.email },
        {
          resetPasswordToken: token,
        }
      ).then((response) => {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: externals.Email,
            pass: externals.Password,
          },
        });
        const mailOptions = {
          from: "ppl@gmail.com",
          to: `${user.email}`,
          subject: "Link to reset Password",
          text:
            "Click the below link to reset password\n" +
            `http://localhost:3000/reset/${token}\n`,
        };
        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.log("the error is ", err);
          } else {
            res.json("Reset Password Link Sent On Your Email");
          }
        });
      });
    }
  });
});
router.post("/resetPassword", (req, res) => {
  New_Collection.updateOne(
    { resetPasswordToken: req.body.token },
    { password: req.body.password }
  ).then((response) => {
    res.json("Password Sucessfully Changed");
  });
});

module.exports = router;

const mongoose = require("mongoose");

var Schema2 = new mongoose.Schema({
  Description: String,
  Category: String,
  Userid: String,
  file_name: String,
  Created_At: { type: String },
  Creation_Time: String,
  Email: String,
  Count: { type: Number, default: 0 },
  Likes: { type: Array, default: [] },
  H: { type: Number, default: 00 },
  Comment: [
    {
      Text: { type: String, default: "Here comes the comment" },
      Name: { type: String, default: "Here comes the name" },
    },
  ],
});

var Image_Collection = mongoose.model("Image_Collection", Schema2);
module.exports = Image_Collection;

const mongoose = require("mongoose");


const bloggingSchema = new mongoose.Schema(
    {
          name: {
            type: String,
            required: true
          },
          userId: {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "User",
          },
          title: {
            type: String,
            required: true
          },
          // file: {
          //   type: String,
          // },
          content: {
            type: String,
            required: true
          },
          likes: {
            type: Number,
            default: 0
          },
          comments: 
            [{text : String}],
    },
    {
        timestamps: true,
    }
);

const Blogging = mongoose.model("Blogging", bloggingSchema);

module.exports = Blogging;
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const authSchema = new schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);

const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    __v: { type: Number, select: false }
  },
  {
    timestamps: true,
    runSettersOnQuery: true
  }
);
module.exports = mongoose.model('User', UserSchema);

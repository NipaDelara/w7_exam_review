const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    gender: { type: String, require: true },
    date_of_birth: { type: String, require: true },
  },
  { timestamps: true, versionkey: false },
);

model.exports = mongoose.model('User', userSchema);

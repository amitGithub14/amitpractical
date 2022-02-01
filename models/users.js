const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema(
  {
    images: {
      type: String,
      default: '',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

var UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
      unique: true,
    },
    code: {
      type: String,
      unique: true,
      maxLength: 6,
      required: true,
    },
    images: [imageSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema);

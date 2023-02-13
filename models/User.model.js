const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      match: EMAIL_PATTERN,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already in use'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Your password must have at least 8 characters']
    },
    googleID: {
      type: String
    },
    location: {
      address: String,
      number: Number,
      additionalInfo: String,
      city: String,
      zip: Number,
      country: String
    },
    birthdate: {
      type: Date
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next) {
  const rawPassword = this.password;
  if (this.isModified('password')) {
    bcrypt.hash(rawPassword, SALT_ROUNDS)
      .then(hash => {
        this.password = hash;
        next()
      })
      .catch(err => next(err))
  } else {
    next();
  }
})

userSchema.methods.checkPassword = function(passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');

passport.serializeUser((user, next) => {
  next(null, user.id)
})

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => {
      next(null, user)
    })
    .catch(err => next(err))
})

const GENERIC_ERROR_MESSAGE = 'Email o contraseña incorrecta'

passport.use('local-auth', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, next) => {
   
    User.findOne({ email })
      .then(user => {
        if (!user) {
          next(null, false, { error: GENERIC_ERROR_MESSAGE })
        } else {
   
          return user.checkPassword(password)
            .then(match => {
              if (!match) {
                next(null, false, { error: GENERIC_ERROR_MESSAGE })
              } else {
                next(null, user)
              }
            })
        }
      })
      .catch(err => next(err))
  }
))
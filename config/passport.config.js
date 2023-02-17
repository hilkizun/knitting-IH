const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User.model');

passport.serializeUser((user, next) => {
  next(null, user.id)
})

passport.deserializeUser((id, next) => {
  User.findById(id)
    .populate('likes')
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

module.exports.GENERIC_ERROR_MESSAGE = GENERIC_ERROR_MESSAGE;

passport.use('google-auth', new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, next) => {
    const googleID = profile.id;
    const given_name = profile.name.givenName;
    const family_name = profile.name.familyName;
    const email = profile.emails && profile.emails[0].value || undefined;
    const image = profile.photos && profile.photos[0].value || undefined;


    if (googleID && email) {
      User.findOne({ email })
        .then(user => {
          if (user) {
            if (user.googleID) {
              // El usuario ya está conectado con Google
              next(null, user)
            } else {
              // Actualizar usuario con el nuevo Google ID
              User.findOneAndUpdate(
                { email },
                { $set: { googleID } },
                { new: true }
              )
                .then(updatedUser => {
                  next(null, updatedUser)
                })
            }
          } else {
            // Crear uno nuevo
            User.create({
              firstName: given_name,
              lastName: family_name,
              email,
              password: mongoose.Types.ObjectId(),
              googleID,
              image,

    //           location: {
    //   address: String,
    //   number: Number,
    //   additionalInfo: String,
    //   city: String,
    //   zip: Number,
    //   country: String
    // },
    // birthdate: {
    //   type: Date
    // }
            })
              .then(userCreated => {
                next(null, userCreated)
              })
          }
        })
        .catch(err => next(err))
    } else {
      next(null, false, { error: 'Error connecting with Google Auth' })
    }
  }
))
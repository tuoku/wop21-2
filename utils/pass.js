'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs')

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await userModel.getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) { // user not found
          return done(null, false);
        }
        // TODO: use bcrypt to check of passwords don't match
        if (!bcrypt.compareSync(password, user.password)) { // passwords dont match
          console.log('here');
          return done(null, false);
        }
        delete user.password; // remove password propety from user object
        return done(null, {...user}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) { // general error
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token
passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey   : 'your_jwt_secret'
    },
    (jwtPayload, done) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      console.log(jwtPayload)
      return userModel.getUser(jwtPayload.user_id)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
    }
));


module.exports = passport;
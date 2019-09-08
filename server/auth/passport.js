var users = require('../api/v1/users/users');
const passport = require('passport');
const passportJWT = require("passport-jwt");

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var tokenExtractor = (req) => {
    if (req.cookies.Auth === undefined) {
        return req.headers.authorization
    } else {
        return req.cookies.Auth
    }
}


var opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([tokenExtractor]),
    secretOrKey: 'testing_jwt'
}

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    users.read(jwt_payload.serial)
      .then(function (data) {
          console.log(data)
        return done(null, data);
      })
      .catch(function (error) {
        return done(error, false);
    });
}));
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const Admin = require('../models/Admin');
const Master = require('../models/Master');
const SuperMaster = require('../models/SuperMaster');
const config = require('../config/database');

// To authenticate the User by JWT Strategy
module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        if(jwt_payload.type == 'user') {
            User.findById(jwt_payload.user._id, (err, user) => {
                if (err) return done(err, false);
                if (user) return done(null, user);
                return done(null, false);
            });
        }
        if(jwt_payload.type == 'master') {
            Master.findById(jwt_payload.user._id, (err, user) => {
                if (err) return done(err, false);
                if (user) return done(null, user);
                return done(null, false);
            });
        }
        if(jwt_payload.type == 'supermaster') {
            SuperMaster.findById(jwt_payload.user._id, (err, user) => {
                if (err) return done(err, false);
                if (user) return done(null, user);
                return done(null, false);
            });
        }
        if(jwt_payload.type == 'admin') {
            Admin.findById(jwt_payload.user._id, (err, user) => {
                if (err) return done(err, false);
                if (user) return done(null, user);
                return done(null, false);
            });
        }
        
    }));
}
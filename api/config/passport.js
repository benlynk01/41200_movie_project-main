// REQUIRES
const passport = require('passport');
const UserModel = require('../models/User');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


// HELPER FUNCTIONS

let createUser = async(username, password, cb) => {
    try{
        const user = await UserModel.create({username, password});
        return cb(null, user);
    } catch(err){
        cb(err);
    }
}

let authenticateLogin = async(username, password, cb) => {
    UserModel.findOne({username})
    .then(async (user) => {
        if(!user){
            return cb(null, false);
        }
        const isValidPwd = await user.isValidPassword(password);

        if(isValidPwd){
            return cb(null, user);
        } else {
            return cb(null, false);
        }
    })
    .catch((err) => {
        cb(err);
    });
}

let getUserFromToken = async (token, cb) => {
    try{
        return cb(null, token.payload);
    } catch(err) {
        cb(err)
    }
}
// MIDDLEWARE

// Local strategy for registering a user
passport.use(
    'register', new localStrategy(
        {
            firstnameField: 'firstName',
            lastnameField: 'lastName',
            usernameField: 'username',
            passwordField: 'password'
        },
        createUser
    )
);


// Local strategy for logging in a user
passport.use(
    'login', new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        authenticateLogin
    )
);


// JWT strategy for reading a token and providing access to a resource
passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.TOP_SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        getUserFromToken
    )
)

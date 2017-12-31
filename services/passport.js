//Passport is to handle the Oauth connect with google\facebook\etc..

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongooes = require('mongoose');
const keys = require('../config/keys');

//One argument will say that we are trying to pull data out of mongooes and two argument we are trying to load something into mongooes.
const User = mongooes.model('users');

passport.serializeUser((user, done)=>{
   done(null, user.id); //The "user.id" is a shortcut for the Id that assgin to this user from MongoDB.
});

passport.deserializeUser((id, done)=>{ //the id is the coockie that we just got from the serializeUser function of passport.
    User.findById(id).then(user => {
        done(null, user);
    });
});

//The second param of GoogleStartegy is the callback with the profile and information of the user that logged in.
//The "done" param is to tell passport.js that we finish to found an existing user or created a new user and add him to the DB.
//GoogleStrategy - that an auth for GOOGLE. If we will want Facebook Login - We will need to install FaceBookStrategy.
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        //Here we will check if there is a user with this Id that is created already and he is exsist on the DB.
        //".then" - means a promise because its asyncronize;
        //findOne is a query to find a User in the DB.
        User.findOne({googleId: profile.id})
        .then((existingUser)=> {
            if(existingUser){
                //We have already a record with the given ID.
                done(null,existingUser);
            }else{
                //We dont have a user with this ID - So we will create a new User - existingUser is NULL.
                  //This is just the model instance and do not added to the DB yet. When we use ".save()"" we actually added to the DB.
                 new User({ googleId: profile.id, name: profile.name.givenName }).save().then(user => done(null,user));

            }
        });

      

        
        
    }
));

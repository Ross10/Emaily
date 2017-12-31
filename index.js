const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');



//Connect to our DB.
mongoose.connect(keys.mongoURI);
const app = express();

//The maxAge is on MilSec.
app.use(
    cookieSession({
       maxAge: 30 * 24 *60 *60 * 1000,//How long the cockie can be validate - Here the cockie will be last for 30 days. 
       keys: [keys.cookieKey]//the coockieKey needs to be encrypt.
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// If heroku gave us a port to use - than use it - otherwise use 5000 on localhost.
// const PORT  = process.env.PORT || 5002;
// console.log("port is : " ,PORT);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

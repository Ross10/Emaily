//Nevigation to different urls.

const passport = require('passport');


module.exports = (app) => {
    // A route handler to watch for incoming requestes with this method.
    // app.get('/', (req,res) => {
    //     res.send({bye: 'buddy'});
    // });

    app.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email']}))
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req,res) => {//This is for redirect the user after the auth wil lbe complete.
            res.redirect('/surveys');
        }

    );
    app.get('/api/logout', (req,res) => {
        req.logout(); // Its delete the cookie ID. Its a passport function.
        res.redirect('/');
    });
    app.get('/api/current_user', (req,res)=> {
        res.send(req.user);
    });

};



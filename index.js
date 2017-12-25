const express = require('express');

const app = express();

//A route handler to watch for incoming requestes with this method.
app.get('/', (req,res) => {
    res.send({bye: 'buddy'});
});

// If heroku gave us a port to use - than use it - otherwise use 5000 on localhost.
const PORT  = process.env.PORT || 5000;

app.listen(PORT);

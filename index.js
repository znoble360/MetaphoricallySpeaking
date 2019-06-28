var express = require('express');
var mongoose  = require('mongoose');
var cors = require('cors');
var bodyparser = require('body-parser');

var app = express();
// Use the environment variable or use a given port
const PORT = process.env.PORT || 3000;

const route = require('./route/routes.js');

mongoose.connect('mongodb://localhost:27017/shoppingList', { useNewUrlParser: true });

mongoose.connection.on('connected',()=>{

        console.log('Working');

});


mongoose.connection.on('error', (err)=>{

    console.log(err);
});



//Middlewares
app.use(cors());
app.use(bodyparser.json());
app.use('/api', route);

//Setting up connection

app.get('/', (req, res) => {
    res.send("We in this bih");

});

app.listen(PORT, ()=> {

    console.log("server started");
});

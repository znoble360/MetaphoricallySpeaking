const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongooose = require('mongoose');

const db = require('./config/keys').MongoURI;

const app = express();

//connect to mongo
mongooose.connect(db, {useNewUrlParser: true})
.then(()=>console.log("Mongo db connected"))
.catch(err=> console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body parser Middleware
app.use(express.urlencoded({extended: false}));


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
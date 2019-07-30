const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongooose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const db = require('./config/keys').MongoURI;
const passport = require('passport');
const app = express();
//pasport config

require('./config/passport')(passport);
//connect to mongo

mongooose.connect(db, {useNewUrlParser: true})
.then(()=>console.log("Mongo db connected"))
.catch(err=> console.log(err));

/*
mongooose.connect('mongodb://localhost:27017/fcc-test', {useNewUrlParser: true})
.then(()=>console.log("Mongo db connected"))
.catch(err=> console.log("We had an error connecting to the database: " + err));
*/

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body parser Middleware
app.use(express.urlencoded({extended: true}));


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());

//global variables
app.use((req,res,next)=>{

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//routes

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/metaphors', require('./routes/add-delete-metaphors'));
app.use('/metaphors', require('./routes/like-dislike-metaphors'));
app.use('/metaphors', require('./routes/edit-metaphors'));
app.use('/metaphors', require('./routes/display'));
app.use('/search', require('./routes/search'));
app.use(express.static(__dirname + '/views'));

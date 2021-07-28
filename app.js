const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./setup/loader/db');

// middleware
const authRoutes = require('./api/controller/route/authRoutes');
const { checkUser } = require('./api/middleware/authMiddleware');
// const infoMiddleware = require('./api/middleware/infoMiddleware');

// ejs
app.set('views', path.join(__dirname, 'api', 'view'));
app.set('view engine', 'ejs');

// config
db();

// public static
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

// cookie parser
app.use(cookieParser());

//
app.get('*', checkUser);
app.use('/', authRoutes);

// app.get("/", function(req, res, next){
//     res.cookie('nexUser', false);
//     res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
    
//     req.cookies;
// })


app.listen(3000, (err)=>{
    if (err) {
        console.log(err);
    };
    console.log('server is ready');
});
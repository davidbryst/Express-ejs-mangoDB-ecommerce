// importation
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('flash');


// setup
const { SECRET } = require('./setup/config/keys');
const db = require('./setup/loader/db');

// controller
const authRoutes = require('./api/controller/route/authRoutes');
const productRouter = require('./api/controller/route/productRouter');
const cartRouter = require('./api/controller/route/cartRouter');

// middleware
const checkUser = require('./api/middleware/authMiddleware').checkUser;
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

// express session
app.use(session({
    secret: SECRET,
    name: 'sessionid',
    cookie: {
      maxAge: 1000 * 60 * 60 / 2,
      secure: false,
      sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl:'mongodb://localhost:27017/Ecommerce' }),
}));

// flash
app.use(flash());

// route
app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200);
});
app.get('*', checkUser);
app.use('/', productRouter);
app.use('/auth', authRoutes);
app.use('/cart', cartRouter);

app.on('error', (err) => {
    console.log('error detected '+err);
})

// listen
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    };
    console.log('server is ready');
});
const userModel = require("../../model/users");
const cart = require('../../model/cart');
const bcrypt = require('bcryptjs');

// handle errors
const handleErrors = (err) => {
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // validation errors
    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = (properties.path === 'email')?'that email is already registered':properties.message;
        });
    }
  
    return errors;
}

class Auth {
    //register
    postRegister = (req, res) => {
        let {username, sexe, email, password} = req.body;
        userModel({ username, email, password, sexe, userRole: 0 }).save()
        .then(user => {
            if (user) {
                req.session.isAuth = true;
                req.session.isAdmin = (user.userRole === 1)?true:false;
                req.session.user = user;
                if (!req.session.cart) {
                    req.session.cart = new cart({});
                }
                res.status(201).redirect('/');
            } else {
                res.status(201).redirect('/auth');
            }
        })
        .catch(err => {
            const error = handleErrors(err);
            console.log((error));
            res.status(201).redirect('/auth');
        });
    }
    // login
    postLogin = async (req, res) => {
        let {email, password} = req.body;
        try {
            const user = await userModel.findOne({ email: email });
            if (user) {
                const auth = await bcrypt.compare(password, user.password);
                if (auth) {
                    req.session.isAuth = true;
                    req.session.isAdmin = (user.userRole === 1)?true:false;
                    req.session.user = user;
                    if (!req.session.cart) {
                        req.session.cart = new cart({});
                    }
                    res.status(200).redirect('/');
                }
                else {
                    res.status(400).redirect('/auth');
                }
            } else {
                res.status(400).redirect('/auth');
            }
        } catch (error) {
            console.log(error);
            res.status(500).redirect('/auth');
        }
    }
    getLogout = (req, res) => {
        req.session.isAuth = false;
        req.session.isAdmin = false;
        delete req.session.user;
        res.redirect('/');
    }
    getAdmin = (req, res) => {
        res.status(200).render('admin');
    }

    getAcountInfo = (req, res) => {
        res.status(200).render('acountInfo');
    };

    getWishList = (req, res) => {
        res.status(200).render('wishList');
    };
}
module.exports = new Auth();
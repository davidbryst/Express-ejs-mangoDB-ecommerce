const userModel = require("../../model/users");

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
    postRegister(req, res) {
        let {username, sexe, email, password} = req.body;
        userModel({ username, email, password, sexe, userRole: 0 }).save()
        .then(user => {
            req.session.isAuth = true;
            req.session.user = user;
            res.status(201).redirect('/');
        })
        .catch(err => {
            const error = handleErrors(err);
            console.log((error));
            res.status(201).redirect('/auth');
        });
    }
    // login
    postLogin(req, res) {
        let {email, password} = req.body;
        userModel.login(email, password)
        .then(user => {
            req.session.isAuth = true;
            req.session.user = user;
            res.status(200).redirect('/');
        })
        .catch(err => {
            const error = handleErrors(err);
            console.log((error));
            res.status(201).redirect('/auth');
        });
    }
    getLogout(req, res) {
        req.session.isAuth = false;
        delete req.session.user;
        res.redirect('/');
    }
}
module.exports = new Auth();
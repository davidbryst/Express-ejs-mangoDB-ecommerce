const requestAuth = (req, res, next) => {
  if (!req.session.isAuth) {
    res.redirect('/auth');
  } else {
    next();
  }
};
const requestNotAuth = (req, res, next) => {
  if (req.session.isAuth) {
    res.redirect('/');
  } else {
    next();
  }
};
const requestAdmin = (req, res, next) => {
  if (!req.session.isAuth) {
    res.redirect('/auth');
  } else {
    if (!req.session.isAdmin) {
      res.redirect('/');
    } else {
      next();
    }
  }
};
const checkUser = (req, res, next) => {
  res.locals.session = req.session;
  next();
};
module.exports = { requestAuth: requestAuth, requestAdmin: requestAdmin, checkUser: checkUser, requestNotAuth: requestNotAuth };
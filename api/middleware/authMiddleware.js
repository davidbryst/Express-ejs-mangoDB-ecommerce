const requestAuth = (req, res, next) => {
  if (!req.session.isAuth) {
    res.redirect('/auth');
  } else {
    next();
  }
};
const checkUser = (req, res, next) => {
  res.locals.session = req.session;
  next();
};
module.exports = { requestAuth: requestAuth, checkUser: checkUser };
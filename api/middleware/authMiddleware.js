const jwt = require('jsonwebtoken');
const userModel = require('../model/users');
const { SECRET } = require('../../setup/config/keys');

const requestAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token){
    try {
      console.log({ decodedToken: jwt.verify(token, SECRET)});
      next();
    } catch {
      res.redirect('/auth');
    }
  } else {
    res.redirect('/auth');
  }
};
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token){
    try {
      const decodedToken = jwt.verify(token, SECRET);
      const user = await userModel.findById(decodedToken._id);
      res.locals.user = user;
      next();
    } catch {
      res.locals.user = null;
      next();
    }
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports = { requestAuth, checkUser };
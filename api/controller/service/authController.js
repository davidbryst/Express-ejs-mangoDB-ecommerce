const {toTitleCase, validateEmail} = require("../../../setup/config/function");
const bcrypt = require('bcryptjs');
const userModel = require("../../model/users");

const jwt = require("jsonwebtoken");
const { SECRET } = require("../../../setup/config/keys");

// generate jwt
const maxAge = 60 * 60 * 24
function generateJWT(user){
    return jwt.sign({
        _id: user._id,
        role: user.userRole
    },
    SECRET,
    {
        expiresIn: maxAge,
    });
};

class Auth {
    //register
    async postRegister(req, res) {
        let {username, sexe, email, password} = req.body;
        try {
            password = bcrypt.hashSync(password, 10);
            let newUser = new userModel({
                username, email, password, sexe,
                // ========= Here role 1 for admin signup role 0 for customer signup =========
                userRole: 0, // Field username change to userRole from role
            });
            newUser
                .save()
                .then((data) => {
                    const token = generateJWT(data);
                    return res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000})
                        .status(200).redirect('/');
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }
    // login
    async postLogin(req, res) {
        let {email, password} = req.body;
        try {
            const data = await userModel.findOne({email: email});
            if (!data) {
                return res.status(400).json({error: "Invalid email or password"});
            } else {
                const login = await bcrypt.compare(password, data.password);
                if (login) {
                    const token = generateJWT(data);
                    const encode = jwt.verify(token, SECRET);
                    return res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge * 1000}).status(200).redirect('/');
                } else {
                    return res.status(400).json({error: "Invalid email or password"});
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    async getLogout(req, res) {
        res.cookie('jwt', '', {maxAge: 1});
        res.redirect('/');
    }
}
const authController = new Auth();
module.exports = authController;
const {toTitleCase, validateEmail} = require("../../../setup/config/function");
const bcrypt = require('bcryptjs');
const userModel = require("../../model/users");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../../setup/config/keys");

// generate jwt
const maxAge = 60 * 60 * 24
function generateJWT(user){
    return jwt.sign({
        _id: user._id,
        role: user.userRole
    },
    JWT_SECRET,
    {
        expiresIn: maxAge,
    });
};

class Auth {
    //register
    async postRegister(req, res) {
        let {username, sexe, email, password, cPassword} = req.body;
        let error = {};
        if (!username || !sexe || !email || !password || !cPassword) {
            error = {
                ...error,
                username: "Filed must not be empty",
                sexe: "Filed must not be empty",
                email: "Filed must not be empty",
                password: "Filed must not be empty",
                cPassword: "Filed must not be empty"
            };
            return res
                .status(400)
                .json({error});
        }
        if (username.length < 3 || username.length > 25) {
            error = {
                ...error,
                username: "username must be 3-25 charecter"
            };
            return res
                .status(400)
                .json({error});
        } else {
            if (sexe === "homme" || sexe === "femme") {
                if (validateEmail(email)) {
                    username = toTitleCase(username);
                    if ((password.length > 255) | (password.length < 8)) {
                        error = {
                            ...error,
                            password: "Password must be 8 charecter",
                            username: "",
                            sexe: "",
                            email: ""
                        };
                        return res
                            .status(400)
                            .json({error});
                    } else {
                        // If Email & Number exists in Database then:
                        try {
                            password = bcrypt.hashSync(password, 10);
                            const data = await userModel.findOne({email: email});
                            if (data) {
                                error = {
                                    ...error,
                                    password: "",
                                    username: "",
                                    sexe: "",
                                    email: "Email already exists"
                                };
                                return res
                                    .status(400)
                                    .json({error});
                            } else {
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
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                } else {
                    error = {
                        ...error,
                        password: "",
                        username: "",
                        email: "Email is not valid"
                    };
                    return res
                        .status(400)
                        .json({error});
                }
            } else {
                error = {
                    ...error,
                    password: "",
                    username: "",
                    email: "",
                    sexe: "sexe is not valid"
                }
                return res
                    .status(400)
                    .json({error});
            }
        }
    }
    // login
    async postLogin(req, res) {
        let {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({error: "Fields must not be empty"});
        }
        try {
            const data = await userModel.findOne({email: email});
            if (!data) {
                return res.status(400).json({error: "Invalid email or password"});
            } else {
                const login = await bcrypt.compare(password, data.password);
                if (login) {
                    const token = generateJWT(data);
                    const encode = jwt.verify(token, JWT_SECRET);
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
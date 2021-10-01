const userModel = require("../models/users");
const validator = require("validator");

exports.signUp = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    if(validator.isEmail(email) === false){
        return res.status(400).json({
            message:'email non conforme'
        })
    }
    if(validator.isStrongPassword(password, {
        minLength:8, 
        minLowercase:1,
        minUppercase:1,
        minNumbers:2,
        minSymbols:1,
        returnScore:false,
    }) === false){
        return res.status(400).json({
            message:'mot de passe non conforme',
        });
    }
    userModel.create(req.body)
    .then((rows) => {
        res.send(rows);
    })
    .catch((error) => {
        res.send(error);
    })
}
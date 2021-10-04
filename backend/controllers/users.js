const userModel = require("../models/users");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwt_decode = require("jwt-decode");
const {isAdmin} = require('../services/isadmin');

exports.signUp = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    if(validator.isEmail(email) === false){
        return res.status(400).json({
            message:'email erroné'
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
            message:'mot de passe erroné',
        });
    }
    userModel.create(req.body)
    .then(() => {
        res.send("utlisateur crée");
    })
    .catch((error) => {
        res.send(error);
    })
}
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(400).json({
            message:"votre identifiant ou votre mot de passe n'est pas valide",
        });
    }
    userModel.searchOneByEmail(email)
    .then((user) => {
        bcrypt.compare(password, user.password)
        .then((valid) => {
            if (!valid) {
                return res.status(401).json({
                    message:"votre identifiant ou votre mot de passe n'est pas valide",
                })
            }

            res.status(200).json({
                token: jwt.sign(
                    {
                        userId : user.id,
                        account: user.account,
                    },
                    process.env.JWT_CODE,
                    {
                        expiresIn:process.env.JWT_EXPIRES,
                    }

                )
            })
        })
        .catch((error) => {
            return res.status(401).json({
                message:error,
            })
        })
    })
    .catch((error) => {
        return res.status(401).json({
            message:error,
        })
    })
}
exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;

    userModel.deleteUser(userId)
    .then((rows) => {
        res.send(rows);
    })
    .catch((error) => {
        return res.status(400).send("Vous n'avez pas les droits pour la supression de cet utilisateur");
    })
}
exports.deleteAccountAdmin = (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt_decode(token);
    const userId = decoded.userId;

    isAdmin(userId)
    .then((isUserAdmin) => {
        if(isUserAdmin === 0) {
            return res.status(400).send("Vous n'avez pas les droits pour la supression de cet utilisateur")      
        }
        userModel.deleteUser(req.params.id)
        .then((rows) => {
            return res.send(rows);
        })
        .catch(() => {
            return res.status(400).send("Vous n'avez pas les droits")
        })
    })
    .catch(() => {
        return res.status(400).send("l'utilisateur n'est pas présent dans la base")
    })
}
exports.getOneUser = (req, res, next) => {
    userModel.getUser(req.params.userId)
      .then((rows) => {
          res.send(rows);
      })
      .catch((err) => {
          console.log(err);
      })
  }

    
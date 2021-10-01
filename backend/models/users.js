const connectionDb = require("../services/connection-bdd");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

exports.create = (post) => {
    return new Promise((resolve, reject) => {
        const db = connectionDb.getDbConnection();
        //modification du mot de passe 10 fois lors de notre connexion
        const saltRounds = 10;

        bcrypt.hash(post.password, saltRounds, (err, hash) => {
            //creation d'une requete sql que l'on envoie au controller et envoie a la bdd si ok
            const sql = "INSERT INTO Users (pseudo, email, password, user_admin, created, updated) VALUES (?, ?, ?, 0, NOW(), NOW())";
            //on fait une requete en sql pour envoyer les données à la bdd
            db.query(sql, [post.pseudo, post.email, hash], (err, rows, fields) => {
                if(err)
                    reject(err);
                resolve("user created");
            });
        })
    });
};

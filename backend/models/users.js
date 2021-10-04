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
      const sql =
        "INSERT INTO Users (pseudo, email, password, user_admin, created, updated) VALUES (?, ?, ?, 0, NOW(), NOW())";
      //on fait une requete en sql pour envoyer les données à la bdd
      db.query(sql, [post.pseudo, post.email, hash], (err, rows, fields) => {
        if (err) reject(err);
        resolve("user created");
      });
    });
  });
};

exports.searchOne = (field, value) => {
  return new Promise((resolve, reject) => {
    const db = connectionDb.getDbConnection();
    const string = `SELECT * FROM users WHERE ${field} = ?`;
    const inserts = [value];
    const sql = mysql.format(string, inserts);

    db.query(sql, (error, user) => {
      if (user.length === 0) {
        reject(new Error(" Votre adresse mail est erronée"));
      }
      const chooseUser = user[0];
      resolve(chooseUser);
    });
  });
};
exports.searchOneByEmail = (email) => {
  return this.searchOne("email", email);
};
exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const db = connectionDb.getDbConnection();
    db.query(
      "DELETE FROM users AS U WHERE U.id = ? ",
      [id],
      (error, rows, fields) => {
        if (error) 
        reject(error);

        resolve("Suppression reussie");
      }
    );
  });
};
exports.getUser = (id) => {
    return new Promise((resolve, reject) => {
        const db = connectionDb.getConnection();
        db.query("SELECT FROM users WHERE id = ?", [id], (error, rows, fields) => {
            if(error) 

                reject(error);

            resolve(rows);

        });
    })
}

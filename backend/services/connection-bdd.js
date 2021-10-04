// import mysql from 'mysql';
const mysql = require('mysql2');


exports.getDbConnection = () =>{
    const db = mysql.createConnection({
        database: 'groupomania',
        host:"localhost",
        user:"root",
        password:"Tortueninja1@",
        multipleStatements: true
    });

    db.connect((err) =>{
        if(err) throw err;
        console.log("connected to database");
    });

    return db;
}
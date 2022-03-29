const mysql = require('mysql');

const getConnection = () => 
{
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        connectTimeout: 10000,
        charset: 'utf8mb4'
    });

    return connection;
}

module.exports = {getConnection};
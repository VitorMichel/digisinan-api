const mysql = require('mysql');

const getConnection = () => 
{
    //change the db
    const connection = mysql.createConnection({
        host: 'mysqlserver.c0o0paimuqop.sa-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: 'swordfish',
        database: 'db-digisinan',
        connectTimeout: 10000,
        charset: 'utf8mb4'
    });

    return connection;
}

module.exports = {getConnection};
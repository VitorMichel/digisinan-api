const mysql = require('mysql');

const getConnection = () => 
{
    const connection = mysql.createConnection({
        host: 'mysqlserver.cl2o7b3srmsh.sa-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: 'swordfish',
        database: 'dbdigisinan',
        connectTimeout: 10000,
        charset: 'utf8mb4'
    });

    return connection;
}

module.exports = {getConnection};
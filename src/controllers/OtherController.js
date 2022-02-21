const { getConnection } = require('../connection.js');
const connection = getConnection();
const { json } = require('express/lib/response');

module.exports = {
    async getOcupacao(request, response)
    {
        let query = 'SELECT * FROM DADO_OCUPACAO';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async getLaboratorio(request, response)
    {
        let query = 'SELECT * FROM LABORATORIO';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async getTeste(request, response)
    {
        let nomeProfissional = '';
        let query = `SELECT NOME_PROF FROM PROFISSIONAL WHERE ID_REG_PROF = '543894'`;
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
            nomeProfissional = results[0].NOME_PROF;
            console.log(nomeProfissional);
            return response.json(results);
        });
    }
};
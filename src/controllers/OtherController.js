const { getConnection } = require('../connection.js');
const connection = getConnection();
const { json } = require('express/lib/response');

module.exports = {
    async getOccupation(request, response)
    {
        let query = 'SELECT * FROM DADO_OCUPACAO';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async getLaboratory(request, response)
    {
        let query = 'SELECT * FROM LABORATORIO';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async getTest(request, response)
    {
        let professionalName = '';
        let query = `SELECT NOME_PROF FROM PROFISSIONAL WHERE ID_REG_PROF = '123456'`;
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
            professionalName = results[0].NOME_PROF;
            return response.json(results);
        });
    }
};
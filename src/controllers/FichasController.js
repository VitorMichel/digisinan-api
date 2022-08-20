const { getConnection } = require('../connection.js');
const connection = getConnection();
const { json } = require('express/lib/response');

module.exports = {
    async dadoTipoIdade(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 3';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async dadoSexoLetra(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 4';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async dadoSexoNumero(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 5';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async dadoGestacao(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 6';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async dadoRacaCor(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 7';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async dadoEscolaridade(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 8';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async dadoZona(request, response)
    {
        let query = 'SELECT * FROM DOMINIO_VALOR WHERE CD_DOMINIO = 9';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    }
}
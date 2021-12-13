const { getConnection } = require('../connection.js');
const connection = getConnection();

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
    }
};
const { getConnection } = require('../connection.js');
const connection = getConnection();

module.exports = {
    async getState(request, response)
    {
        let query = 'SELECT * FROM ESTADO';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async getCity(request, response)
    {
        let query = 'SELECT * FROM MUNICIPIO';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async getCountry(request, response)
    {
        let query = 'SELECT * FROM PAISES';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    }
};
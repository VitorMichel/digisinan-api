const { getConnection } = require('../connection.js');
const connection = getConnection();

module.exports = {
    async getUserData(request, response)
    {
        let query = 'SELECT * FROM ESTADO';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    }
};
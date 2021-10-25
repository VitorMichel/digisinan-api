const { getConnection } = require('../connection.js');
const connection = getConnection();

module.exports = {
    async index(request, response)
    {
        let query = 'SELECT * FROM TABELA';
        console.log(query);

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async addFicha(request, response)
    {
        const {TODOS_OS_CAMPOS} = request.body;

        let query = `INSERT INTO TABELA (TODOS_OS_CAMPOS)`;
        query += `VALUES ('${TODOS_OS_CAMPOS}')`;

        console.log(query)

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json({status: 200, message: results});
        });
    }
};
const { getConnection } = require('../connection.js');
const connection = getConnection();

module.exports = {
    async getUserData(request, response)
    {
        console.log(response);

    }
};
const { getConnection } = require('../connection.js');
const connection = getConnection();

module.exports = {
    async getUserData(request, response)
    {
        const { data } = request.body;

        let query = 'INSERT INTO USUARIO (NM_USUARIO,      NM_USUARIO_SOCIAL,       DS_SENHA,        NR_CPF,         DS_EMAIL,           CD_CONSELHO,             NR_CONSELHO,           CD_UF,          IM_ASSINATURA)';
        query +=    'VALUES              ('${data.nome}', '${data.nomeSocial}', '${data.senha}', '${data.cpf}', '${data.email}', '${data.codigoConselho}', '${data.numeroConselho}', '${data.uf}', '${data.imagem_assinatura}');'

        connection.query(query, function (error, results, fields) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    }
};
const { getConnection } = require('../connection.js');
const connection = getConnection();

module.exports = {
    async getUserData(request, response)
    {
        let date = new Date();

        // criptografar senha

        let query = 'INSERT INTO USUARIO (NM_USUARIO, NM_USUARIO_SOCIAL, DS_SENHA, NR_CPF, DS_EMAIL, CD_CONSELHO, NR_CONSELHO, CD_UF, IM_ASSINATURA, DT_REGISTRO, DT_ATUALIZACAO)';
        query +=    `VALUES ('${request.body.nomeUsuario}', '${request.body.nomeSocial}', '${request.body.senha}', '${request.body.cpf}', '${request.body.email}', '${request.body.codigoConselho}', '${request.body.numeroConselho}', '${request.body.uf}', '${request.body.imagem_assinatura}', '${date.toISOString().split('T')[0]}', '${date.toISOString().split('T')[0]}');`;

        connection.query(query, function (error, results) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async login(request, response)
    {
        
    }
};
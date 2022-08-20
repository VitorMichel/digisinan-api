const { getConnection } = require('../connection.js');
const connection = getConnection();

module.exports = {
    async getUserData(request, response)
    {
        let date = new Date();

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
        
    },

    async pegarUsuarios(request, response)
    {
        const { cpf } = request.query;
        
        // Pegar descrição do conselho e sigla
        let query = `SELECT * FROM USUARIO WHERE NR_CPF = '${cpf}'`;

        connection.query(query, function (error, results) {
            if (error)
                return response.json({ status: 404, message: error.message });

            return response.json(results);
        });
    },

    async pegarDadosConselho(request, response)
    {
        // Pegar descrição do conselho e sigla
        let query = 'SELECT DS_VALOR_DOMINIO, RES_VALOR_DOMINIO FROM DOMINIO_VALOR WHERE CD_DOMINIO = 1';

        connection.query(query, function (error, results) {
            if (error)
                return response.json({ status: 404, message: error.message });

            return response.json(results);
        });
    }
};
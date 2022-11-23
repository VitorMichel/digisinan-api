const { getConnection } = require('../connection.js');
const connection = getConnection();

module.exports = {
    async postUser(request, response)
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

    async postUsuarioEstabelecimento(request, response)
    {
        let date = new Date();

        let query = 'INSERT INTO USUARIO_ESTABELECIMENTO (CD_USUARIO, NR_CNES, DT_REGISTRO, DT_ATIVACAO, DT_INATIVACAO, IE_SITUACAO)';
        query +=    `VALUES ('${request.body.codigoUsuario}', '${request.body.cnes}', '${date.toISOString().split('T')[0]}', '${date.toISOString().split('T')[0]}', '${date.toISOString().split('T')[0]}', 'null');`;

        connection.query(query, function (error, results) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },

    async pegarUsuarioEstabelecimento(request, response)
    {
        let query = `SELECT * FROM USUARIO_ESTABELECIMENTO`;

        connection.query(query, function (error, results) {
            if (error)
                return response.json({ status: 404, message: error.message });

            return response.json(results);
        });
    },

    async pegarUsuarioPorCpf(request, response)
    {
        const { cpf } = request.query;

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
    },

    async getUsuarioEstabelecimento(request, response)
    {
        let query = 'SELECT * FROM USUARIO_ESTABELECIMENTO;';

        connection.query(query, function (error, results) {
            if (error)
                return response.json({ status: 404, message: error.message });

            return response.json(results);
        });
    },

    async getEstabelecimentoCarga(request, response)
    {
        let query = 'SELECT * FROM dbdigisinan.ESTABELECIMENTO_CARGA;';

        connection.query(query, function (error, results) {
            if (error)
                return response.json({ status: 404, message: error.message });

            return response.json(results);
        });
    }
};
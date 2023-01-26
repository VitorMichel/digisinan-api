const { response } = require('express');
const { getConnection } = require('../connection.js');
const connection = getConnection();
const fetch = require('node-fetch');

function getFirstLetter(str) {
    const firstLetter = str
      .split(' ')
      .map(palavra => palavra[0])
      .join('');

    return firstLetter.toUpperCase();
}

async function RetornaApiDadosAbertosCnes(cnes) {
    var url = `http://apidadosabertos.saude.gov.br/cnes/estabelecimentos/${cnes}`;
    let settings = { method: "Get" };

    let retorno = {};

    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            retorno = json;
    });

    return new Promise(resolve => {
        setTimeout(() => {
          resolve(retorno);
        }, 2000);
    });
};

async function PostEstabelecimento(estabelecimento) {
    let date = new Date();

    let siglaEstabelecimento = getFirstLetter(estabelecimento.nome_fantasia);

    let ieSituacaoCnes = estabelecimento.codigo_motivo_desabilitacao_estabelecimento;
    let ieSituacaoCliente = estabelecimento.codigo_motivo_desabilitacao_estabelecimento;
    if (ieSituacaoCnes == null)
        ieSituacaoCnes = '0';
    if (ieSituacaoCliente == null)
        ieSituacaoCliente = 'A';

    let query = 'INSERT INTO ESTABELECIMENTO (NR_CNES, IE_SITUACAO_CNES, NR_CNPJ, NR_CNPJ_MANTENEDORA, DS_RAZAO_SOCIAL, DS_ESTABELECIMENTO, DS_ENDERECO, NR_ENDERECO, DS_COMPLEMENTO, DS_BAIRRO, NR_CEP, CD_MUNICIPIO_IBGE, IE_COMPETENCIA, NR_TELEFONE, DS_RAMAL, DS_EMAIL, DS_SENHA, DS_INICIAIS_ESTAB, IE_SITUACAO_CLIENTE, DT_AQUISICAO, DT_CANCELAMENTO)';
    query +=    `VALUES ('${estabelecimento.codigo_cnes}', '${ieSituacaoCnes}', '${estabelecimento.numero_cnpj}', '${estabelecimento.numero_cnpj_entidade}', '${estabelecimento.nome_razao_social}', '${estabelecimento.nome_fantasia}', '${estabelecimento.endereco_estabelecimento}', '${estabelecimento.numero_estabelecimento}',        null, '${estabelecimento.bairro_estabelecimento}', '${estabelecimento.codigo_cep_estabelecimento}', '${estabelecimento.codigo_ibge_municipio}', 'null', '${estabelecimento.numero_telefone_estabelecimento}', null, '${estabelecimento.endereco_email_estabelecimento}', 'null', '${siglaEstabelecimento}', '${ieSituacaoCliente}', '${date.toISOString().split('T')[0]}', null);`;

    console.log(query);

    connection.query(query, function (error, results) {
        if (error){
            console.log(error);
            return false;
        } 

        return true;
    });
};

 function ExisteCnesTabelaEstabelecimento(cnes) {
    let query = `SELECT * FROM ESTABELECIMENTO WHERE NR_CNES = '${cnes}'`;

    let retorno = false;
    
    connection.query(query, function (error, results) {
        if (error) 
            return response.json({ status: 404, message: error.message });
        
        if (results.length != 0){
            retorno = true;
        }
    });

    return new Promise(resolve => {
        setTimeout(() => {
          resolve(retorno);
        }, 2000);
    });
};

module.exports = {

    async postUsuarioEstabelecimento(request, response)
    {
        var estabelecimento;

        var valid = await ExisteCnesTabelaEstabelecimento(request.body.cnes);

        if (valid == false){
            console.log('Não existe estabelecimento cadastrado com esse CNES. CADASTRANDO...');

            estabelecimento = await RetornaApiDadosAbertosCnes(request.body.cnes);
                
            await PostEstabelecimento(estabelecimento);
        }

        let date = new Date();

        let query = 'INSERT INTO USUARIO_ESTABELECIMENTO (CD_USUARIO, NR_CNES, DT_REGISTRO, DT_ATIVACAO, DT_INATIVACAO, IE_SITUACAO)';
        query +=    `VALUES ('${request.body.codigoUsuario}', '${request.body.cnes}', '${date.toISOString().split('T')[0]}', '${date.toISOString().split('T')[0]}', '${date.toISOString().split('T')[0]}', 'A');`;

        console.log(query);

        connection.query(query, function (error, results) {
            if (error) 
                return response.json({ status: 404, message: error.message });
                
            return response.json(results);
        });
    },   

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

        console.log(query);

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
        const { cdMunicipioIbge } = request.query;

        let query = `SELECT * FROM ESTABELECIMENTO_CARGA WHERE CD_MUNICIPIO_IBGE LIKE '${cdMunicipioIbge}%';`;

        connection.query(query, function (error, results) {
            if (error)
                return response.json({ status: 404, message: error.message });

            return response.json(results);
        });
    }
};
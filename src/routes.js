const { Router } = require('express');
const LocalizationtionController = require('./controllers/LocalizationController.js');
const OtherController = require('./controllers/OtherController.js');
const CreateController = require('./controllers/Create.js');
const FichasController = require('./controllers/FichasController.js');
const FichaAidsController = require('./controllers/FichaAIDSController.js');

//TESTING ONLY
const TestClass = require('./TestClass.js');

const routes = Router();

// Localizacao
routes.get('/state', LocalizationtionController.getState);
routes.get('/city', LocalizationtionController.getCity);
routes.get('/country', LocalizationtionController.getCountry);

// Usuario
routes.post('/postUsuarioEstabelecimento', CreateController.postUsuarioEstabelecimento);
routes.post('/postUser', CreateController.postUser);
routes.get('/dadosConselho', CreateController.pegarDadosConselho);
routes.get('/pegarUsuario', CreateController.pegarUsuarioPorCpf);
routes.get('/pegarUsuarioEstabelecimento', CreateController.pegarUsuarioEstabelecimento);
routes.get('/occupation', OtherController.getOccupation);
routes.get('/pegarUsuarioEstabelecimento', CreateController.getUsuarioEstabelecimento);

// Estabelecimento
routes.get('/pegarEstabelecimentoCarga', CreateController.getEstabelecimentoCarga);

// Dados iguais para fichas
routes.get('/tipoIdade', FichasController.dadoTipoIdade);
routes.get('/sexoLetra', FichasController.dadoSexoLetra);
routes.get('/sexoNumero', FichasController.dadoSexoNumero);
routes.get('/gestacao', FichasController.dadoGestacao);
routes.get('/racaCor', FichasController.dadoRacaCor);
routes.get('/escolaridade', FichasController.dadoEscolaridade);
routes.get('/zona', FichasController.dadoZona);

// Dados para Ficha AIDS Adulto
routes.post('/postFichaAidsAdulto', FichaAidsController.postFichaAidsAdulto);
routes.get('/relacoesSexuais', FichaAidsController.dadoRelacoesSexuais);
routes.get('/evidenciaLaboratorialInfeccao', FichaAidsController.dadoEvidenciaLaboratorialInfeccao);
routes.get('/evolucaoCaso', FichaAidsController.dadoEvolucaoCaso);

//TESTING ONLY
routes.get('/getTest', OtherController.getTest);
routes.get('/testMethod', TestClass.testMethod);

module.exports = routes;
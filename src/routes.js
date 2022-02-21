const { Router } = require('express');

const FichaController = require('./controllers/FichaController.js');
const LocalizationtionController = require('./controllers/LocalizationController.js');
const OtherController = require('./controllers/OtherController.js');
const CreatePdf = require('./testePdf.js');
const GerarLinkPdf = require('./createLinkPdf.js');

const routes = Router();

routes.get('/ficha', FichaController.getNumeroFicha);
routes.post('/addficha', FichaController.postAddFicha);
routes.get('/estado', LocalizationtionController.getEstado);
routes.get('/municipio', LocalizationtionController.getMunicipio);
routes.get('/paises', LocalizationtionController.getPais);
routes.get('/ocupacao', OtherController.getOcupacao);
routes.get('/laboratorio', OtherController.getLaboratorio);

routes.get('/getTeste', OtherController.getTeste);

routes.get('/teste', GerarLinkPdf.criarLink)

module.exports = routes;
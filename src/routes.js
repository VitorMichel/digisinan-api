const { Router } = require('express');

const FichaController = require('./controllers/FichaController.js');
const LocalizationtionController = require('./controllers/LocalizationController.js');
const OtherController = require('./controllers/OtherController.js');
const CreatePdf = require('./createPdf');

const routes = Router();

routes.get('/ficha', FichaController.getNumeroFicha);
routes.post('/addficha', FichaController.postAddFicha);
routes.get('/estado', LocalizationtionController.getEstado);
routes.get('/municipio', LocalizationtionController.getMunicipio);
routes.get('/paises', LocalizationtionController.getPais);
routes.get('/ocupacao', OtherController.getOcupacao);
routes.get('/laboratorio', OtherController.getLaboratorio);

routes.get('/create', CreatePdf.createSamplePdf);

module.exports = routes;
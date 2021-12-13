const { Router } = require('express');

const FichaController = require('./controllers/FichaController.js');
const LocationController = require('./controllers/LocationController.js');
const OtherController = require('./controllers/OtherController.js');

const routes = Router();

routes.get('/ficha', FichaController.getNumeroFicha);
routes.post('/addficha', FichaController.postAddFicha);
routes.get('/estado', LocationController.getEstado);
routes.get('/municipio', LocationController.getMunicipio);
routes.get('/paises', LocationController.getPais);
routes.get('/ocupacao', OtherController.getOcupacao);
routes.get('/laboratorio', OtherController.getLaboratorio);

module.exports = routes;
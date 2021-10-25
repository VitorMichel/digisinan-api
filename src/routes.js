const { Router } = require('express');

const FichaController = require('./controllers/FichaController.js');

const routes = Router();

routes.get('/ficha', FichaController.index);
routes.post('/addficha', FichaController.addFicha);

module.exports = routes;
const { Router } = require('express');
const LocalizationtionController = require('./controllers/LocalizationController.js');
const OtherController = require('./controllers/OtherController.js');
const CreateController = require('./controllers/Create.js');

//TESTING ONLY
const TestClass = require('./TestClass.js');

const routes = Router();

routes.get('/state', LocalizationtionController.getState);
routes.get('/city', LocalizationtionController.getCity);
routes.get('/country', LocalizationtionController.getCountry);
routes.post('/postUser', CreateController.getUserData);
routes.get('/dadosConselho', CreateController.pegarDadosConselho);
routes.get('/login', CreateController.login);
routes.get('/occupation', OtherController.getOccupation);

//TESTING ONLY
routes.get('/getTest', OtherController.getTest);
routes.get('/testMethod', TestClass.testMethod);

module.exports = routes;
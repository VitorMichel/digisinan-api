const { Router } = require('express');
const FileController = require('./controllers/FileController.js');
const LocalizationtionController = require('./controllers/LocalizationController.js');
const OtherController = require('./controllers/OtherController.js');
const CreateController = require('./controllers/Create.js');

//TESTING ONLY
const TestClass = require('./TestClass.js');

const routes = Router();

routes.get('/file', FileController.getFileNumber);
routes.post('/addfile', FileController.postAddFile);
routes.get('/state', LocalizationtionController.getState);
routes.get('/city', LocalizationtionController.getCity);
routes.get('/country', LocalizationtionController.getCountry);
routes.get('/postUser', CreateController.getUserData);
routes.get('/occupation', OtherController.getOccupation);
routes.get('/laboratory', OtherController.getLaboratory);

//TESTING ONLY
routes.get('/getTest', OtherController.getTest);
routes.get('/testMethod', TestClass.testMethod)

module.exports = routes;
const { Router } = require('express');

const FichaController = require('./controllers/FichaController.js');
const LocalizationtionController = require('./controllers/LocalizationController.js');
const OtherController = require('./controllers/OtherController.js');
const CreatePdf = require('./testePdf.js');

const routes = Router();

routes.get('/ficha', FichaController.getNumeroFicha);
routes.post('/addficha', FichaController.postAddFicha);
routes.get('/estado', LocalizationtionController.getEstado);
routes.get('/municipio', LocalizationtionController.getMunicipio);
routes.get('/paises', LocalizationtionController.getPais);
routes.get('/ocupacao', OtherController.getOcupacao);
routes.get('/laboratorio', OtherController.getLaboratorio);

// routes.post('/invoice', (request, response, next) => {
//     const stream = response.writeHead(200, {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'attachment;filename=invoice.pdf',
//     });

//     CreatePdf.testePDF(
//         '',
//         (chunk) => stream.write(chunk),
//         () => stream.end()
//     );
// });

// routes.post('/testeBase64', (req, res) => {
//     CreatePdf.testeBase64(res);
// });

routes.post('/inicio', (req, res) => {
    CreatePdf.createSamplePdf();
});

module.exports = routes;
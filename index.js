const express = require('express');
const routes = require('./src/routes')
var cors = require('cors');
require('dotenv').config();

const app = express();

let port = process.env.PORT || 3333;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // app.use(cors());
    next();
});
app.use(express.json());
app.use(routes);
app.listen(port, () => {
    console.log('🚀 Server started on port: ' + port);
})

//http://localhost:3333
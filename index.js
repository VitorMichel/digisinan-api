const express = require('express');
const routes = require('./src/routes')
var cors = require('cors');
const app = express();
let port = process.env.PORT || 3333;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    // res.header("Access-Control-Allow-Headers: Content-Type");
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    app.use(cors());
    next();
});
app.use(express.json());
app.use(routes);
var server = app.listen(port, () => {
    console.log('🚀 Server started on port: ' + port);
});

app.timeout = 600000;
//http://localhost:3333
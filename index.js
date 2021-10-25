const express = require('express');
const routes = require('./src/routes')
var cors = require('cors');

const app = express();

let port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port, () => {
    console.log('🚀 Server started on port: ' + port);
})

//http://localhost:3333
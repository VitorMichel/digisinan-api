const express = require('express');
const routes = require('./src/routes')
var cors = require('cors');
const app = express();
let port = process.env.PORT || 3333;

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
//     // res.header("Access-Control-Allow-Headers: Content-Type");
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
//     app.use(cors());
//     next();
// });

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json());
app.use(routes);
app.listen(port, () => {
    console.log('🚀 Server started on port: ' + port);
})
//http://localhost:3333
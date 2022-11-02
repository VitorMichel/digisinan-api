const express = require('express');
const routes = require('./src/routes')
var cors = require('cors');
require('dotenv').config();

const app = express();

let port = process.env.PORT || 3333;

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
// app.use();


// app.use((req, res, next) => {
//     //allow access from every, elminate CORS
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.removeHeader('x-powered-by');
//     //set the allowed HTTP methods to be requested
//     res.setHeader('Access-Control-Allow-Methods','POST');
//     //headers clients can use in their requests
//     res.setHeader('Access-Control-Allow-Headers','Content-Type');
//     //allow request to continue and be handled by routes
//     next();
//   });

var options = {
    url:  'http://url',
    timeout: 120000
}

app.use((req, res, next) => {
    req(options, function(err, resp, body) {});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    cors(corsOpts);
    next();
});
app.use(express.json());
app.use(routes);
app.listen(port, () => {
    console.log('🚀 Server started on port: ' + port);
})





//http://localhost:3333
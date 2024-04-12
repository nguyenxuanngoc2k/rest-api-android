
const express = require('express');
const userRoute = require('./user');
const categoryRoute = require('./category');
const productRouter = require('./product');
const apiRoute = express.Router();

const {authorizationJwt} = require('../middleware');
apiRoute.use('/user',(req, res, next) => {
    console.log('call user api route');
    next();
},authorizationJwt, userRoute);

apiRoute.use('/category',authorizationJwt, categoryRoute);

apiRoute.use('/product',authorizationJwt, productRouter);


// apiRoute.use('/', function (req, res) {
//     return res.json({'message': 'api working'})
// });
    
module.exports = apiRoute;
// API -> USER -> LOGIN -> REGISTER

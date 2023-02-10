const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv/config')

const api = process.env.API_URL
const productsRoutes = require('./routers/products');
const categoriesRoutes = require('./routers/categories');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');
const authJwt = require('./helpers/jwt');

app.use(cors());
app.options('*',cors());

// Middleware
// Used for control req and respon data from server, the old is bodyparser
app.use(express.json());
// used for showing log access in api endpoint
app.use(morgan('tiny'));
app.use(authJwt());

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// mongodb connection
mongoose.set('strictQuery',false);
mongoose.connect(process.env.CONNECTION_STRING,{
    dbName: "eshop-database",
}).then(()=>{
    console.log('Database Ready')
}).catch((err)=>{
    console.log(err);
});

app.listen(3000,()=>{
    console.log('Server is running http://localhost:3000');
})
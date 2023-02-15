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
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*',cors());

// Middleware
// Used for control req and respon data from server, the old is bodyparser
app.use(express.json());
// used for showing log access in api endpoint
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// mongodb connection
mongoose.set('strictQuery',false);
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
}).then(()=>{
    console.log('Database Ready')
}).catch((err)=>{
    console.log(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running http://localhost:${PORT}`);
})
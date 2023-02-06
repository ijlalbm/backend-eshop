const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv/config')

const api = process.env.API_URL

// Middleware
// Used for control req and respon data from server, the old is bodyparser
app.use(express.json())
// used for showing log access in api endpoint
app.use(morgan('tiny'))

app.get(`${api}/products`,(req,res)=>{
    const product = {
        id:1,
        name:'Hairdresser',
        image: 'some_url'
    }
    res.send(product)
})

app.post(`${api}/products`,(req,res)=>{
    //get data from user edp post
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
})
mongoose.set('strictQuery',false);
mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log('Database Ready')
}).catch((err)=>{
    console.log(err);
});

app.listen(3000,()=>{
    console.log('Server is running http://localhost:3000');
})
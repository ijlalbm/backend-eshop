const express = require('express')
const app = express()

require('dotenv/config')

const api = process.env.API_URL

// Middleware
// Used for control req and respon data fromtge server, the old is bodyparser
app.use(express.json())

app.get(`${api}/products`,(req,res)=>{
    const product = {
        id:1,
        name:'Hairdresser',
        image: 'some_url'
    }
    res.send(product)
})

app.post(`${api}/products`,(req,res)=>{
    //get data from user post
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
})

app.listen(3000,()=>{
    console.log('Server is running http://localhost:3000');
})
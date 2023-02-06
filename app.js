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

// schema is table structure in sql
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
    },
})

const Product = mongoose.model('Product', productSchema)

app.get(`${api}/products`, async (req,res)=>{
    const productList = await Product.find();

    if(!productList) {
        res.status(500).json({success: false})
    }
    
    res.send(productList);
})

app.post(`${api}/products`,(req,res)=>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

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
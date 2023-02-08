const mongoose = require('mongoose')

// schema is table structure in sql
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
    },
})

exports.Product = mongoose.model('Product', productSchema)
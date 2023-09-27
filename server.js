const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')

const app = express()

app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Blogg here')
})

// get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message),
        res.status(500).json({message: error.message})
    }
})

// get by ID
app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message),
        res.status(500).json({message: error.message})
    }
})

// create new 
app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch(error) {
        console.log(error.message),
        res.status(500).json({message: error.message})
    }
})

// update 
app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // if there is no product with that ID
        if(!product){
            return res.status(404).json({message: `cannot find product in database with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message),
        res.status(500).json({message: error.message})
    }
})

// destroy 
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        // if there is no product with that ID
        if(!product){
            return res.status(404).json({message: `cannot find product in database with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message),
        res.status(500).json({message: error.message})
    }
})



mongoose.connect('mongodb+srv://izanotto:Aa321321@db-node-api.ujgcq2x.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongoDB')
    app.listen(3000, ()=> {
        console.log('Node API running port 3000')
    })
}).catch((error) => {
    console.log(error)
})
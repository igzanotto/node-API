const express = require('express')
const mongoose = require('mongoose')
// const cors = require('cors')
const Product = require('./models/productModel')
const Task = require('./models/taskModel')
require('dotenv').config()

const app = express()

// app.use(cors());
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
app.post('/products', async (req, res) => {
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

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Read all tasks
  app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Read a single task
  app.get('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a task
  app.put('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a task
  app.delete('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndRemove(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('connected to mongoDB')
    app.listen(3000, ()=> {
        console.log('Node API running port 3000')
    })
}).catch((error) => {
    console.log(error)
})
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//routes
app.get('/', (req, res) => {
    res.send('hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Blogg here')
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
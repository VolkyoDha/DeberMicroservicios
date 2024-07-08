const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/elysium';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const ProductoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number
});

const Producto = mongoose.model('Producto', ProductoSchema);

app.post('/productos', (req, res) => {
    const producto = new Producto(req.body);
    producto.save().then(() => res.status(201).send(producto));
});

app.get('/productos', (req, res) => {
    Producto.find().then(productos => res.send(productos));
});

app.listen(3002, () => console.log('App2 listening on port 3002'));

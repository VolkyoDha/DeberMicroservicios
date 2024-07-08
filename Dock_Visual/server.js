const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/elysium';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const ClienteSchema = new mongoose.Schema({
    nombre: String,
    telefono: String
});
const Cliente = mongoose.model('Cliente', ClienteSchema);

app.get('/clientes', (req, res) => {
    Cliente.find().then(clientes => res.send(clientes));
});

const ProductoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number
});

const Producto = mongoose.model('Producto', ProductoSchema);

app.get('/productos', (req, res) => {
    Producto.find().then(productos => res.send(productos));
});

app.listen(3003, () => console.log('App3 listening on port 3003'));

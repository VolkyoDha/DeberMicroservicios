const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/elysium';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const ClienteSchema = new mongoose.Schema({
    nombre: String,
    telefono: String,
    fechaRegistro: { type: Date, default: Date.now },
    horaRegistro: { type: String } 
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

app.post('/clientes', (req, res) => {
    const { nombre, telefono } = req.body;
    const horaRegistro = new Date().toLocaleTimeString(); 

    const cliente = new Cliente({
        nombre,
        telefono,
        horaRegistro
    });

    cliente.save()
        .then(() => res.status(201).send(cliente))
        .catch(err => res.status(500).send(err));
});

app.get('/clientes', (req, res) => {
    Cliente.find().then(clientes => res.send(clientes));
});

app.listen(3001, () => console.log('App1 listening on port 3001'));

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/dbMongo')

//Despues de instanciar todo es lo 1ro que se hace, el enrutador.
const routerUsers = require('./routes/routesUsers')
const routerMessages = require('./routes/routesMessages')

//conexion a la base de datos
db.connect('mongodb://carlos:a1b2c3d4@localhost:27017/')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//rutas usuarios
app.use('/api/v1', routerUsers) //localhost:3000/api/v1/users
app.use('/api/v1', routerMessages) //localhost:3000/api/v1/messages

//puesta en marcha del servidor
app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto 3000');
});
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/dbMongo')

//load env variables
require('dotenv').config()

//Despues de instanciar todo es lo 1ro que se hace, el enrutador.
const routerUsers = require('./routes/routes-Users')
const routerMessages = require('./routes/routes-Messages')
const routerMarvelCharacters = require('./routes/routes-MarvelCharacters')

//conexion a la base de datos
db.connect(`${process.env.DB_CONNECTION_MONGO}`)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//rutas:
app.use(`${process.env.API_VERSION_ROUTER}`, routerUsers)            //localhost:3000/api/v1/users
app.use(`${process.env.API_VERSION_ROUTER}`, routerMessages)         //localhost:3000/api/v1/messages
app.use(`${process.env.API_VERSION_ROUTER}`, routerMarvelCharacters) //localhost:3000/api/v1/MarvelCharacters

//puesta en marcha del servidor
app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on the port 3000');
});
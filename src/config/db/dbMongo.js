const db = require('mongoose');

//conexion a la base de datos
db.set('strictQuery', false);
db.Promise = global.Promise;

async function connect(url) {
    try{
        await db.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'Marvel-Api',
        });
        console.log('[db] conectada con exito');
    }catch(error){
        console.error('[db]', error);
    } 
}

exports.connect = connect;
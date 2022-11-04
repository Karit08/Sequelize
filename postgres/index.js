//2  importamos el servidor y lo ponemos a escuchar
const server = require('./src/app'); // 1

// ahora importamos nuestra base de datos
const { database } = require('./src/db');

server.listen("3001", async ()=> { // si esto sale bien me indicará que estoy lista para trabajar con la dB
    // await database.sync();  // metodo para sincronizar la INSTANCIA que tengo co la base de datos real
    await database.sync({force: true}); // Elimina todas la tablas y vuelve a cerar como esten definidas en el modelo
    // await database.sync({alter: true}); // Modifica las tablas ya existentes en base a como esten definidas en el modelo
    //  EN CONCLUSIÓN lo que hacemos es sincronizar esta instancia de sequelize con la base de datos a la que se conecta.
    console.log('listening on port 3001');
}); // 2

// server.listen('3001', ()=> {
//     database.sync();
//     console.log('listening on port 3001');
// }); // 2
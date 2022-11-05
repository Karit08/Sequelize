// 1----------------------------------------------------------------------
// Primeros pasos npm init -y
//touch app.js config.js
// Se INSTALA npm i express nodemon 

// 1. Creamos nuetras primera aplicación básica de EXPRESS

const express = require('express')
const app = express()
const sequelize = require('./database/db');
const User = require('./database/models/User');

//Setting
const port = process.env.Port || 3000;
//Rutes
// app.get('/', (req, res) => {
//   res.send('Server Example!');
// })

app.get('/', (req, res) => {
  User.create({
    name: 'Kar',
    birthday: new Date(1996, 3, 30),
  }).then(user =>{
    res.json(user);
  })
})

// Start the server 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  //   cuando arancamos el servidor nos conectamos a la base de datos;
  // sequelize.authenticate().then(() =>{
  //   console.log('Connected to database');
  // }).catch( e =>{
  //   console.log('An error has occurred', error)
  // });
  // force: false DROP TABLE
  sequelize.sync({ force: false }).then(() =>{
    console.log('Connected to database');
    }).catch( e =>{
    console.log('An error has occurred', error)
  });
})

// npm run dev ---> corremos el servidor 
//3 realizamos la conección con la base de datos a traves de Squelize
const { Sequelize, DataTypes } = require('sequelize'); //1
const User1 = require('./models/user');
const Post1 = require('./models/post');
const Page1 = require('./models/Page');

const user = "postgres";
const pass = 12345;
const dbname = "lecture"; 

const database = new Sequelize(
    `postgres://${user}:${pass}@localhost:5432/${dbname}`,
    { logging: false } 
); 


User1(database);
Post1(database);
Page1(database);

const {User, Post, Page} = database.models;

User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(Page, { through: "UserPage" });
Page.belongsToMany(User, { through: "UserPage" });

module.exports = {database, ...database.models}; 

// --------------------------------EXPLICACIÓN---------------------------------------

// //3 realizamos la conección con la base de datos a traves de Squelize
// const { Sequelize, DataTypes } = require('sequelize'); //1
// const User1 = require('./models/user');
// const Post1 = require('./models/post');
// const Page1 = require('./models/Page');
// const user = "postgres";
// const pass = 12345;
// const dbname = "lecture"; 

// // const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') 
// const database = new Sequelize(
//     `postgres://${user}:${pass}@localhost:5432/${dbname}`,
//     { logging: false } // no me da información constante de lo que estoy haciendo
// ); 

// // 2 es una instancia de squelize que es la conexión con la BASE de DATOS
// //el parametro que va a recibir es USURAIO, CONTRASEÑA, PUERTO y NOMBRE DE LA BASE DE DATOS;
// // esta instancia se encargara de interactuaar con la base de datos------------------------

// User1(database); // aqui se ejecutan las funciones
// Post1(database);
// Page1(database);
// // database.define('User', { //creo MODELO, defino los atributos, pero esto se puede modularizar. en User.js
// //     id: {
// //         type: DataTypes.INTEGER, // olibatoriamente se debe llamar a DataTypes (que es un objeto) para definir el tipo de dato
// //         primaryKey: true,
// //         autoIncrement: true, // autoincremental
// //     },
// //     name:{
// //         type: DataTypes.STRING,
// //         allowNull: false, // no se le permite null
// //     },
// //     last_name:{
// //         type: DataTypes.STRING,
// //         allowNull: false,
// //         unique: true, // unico
// //     },
// //     birth:{
// //         type: DataTypes.DATEONLY, // para que solo use el tipo fecha y no hora
// //         allowNull: false,
// //     }
// // }); 

// ----------------------------------- RELACIONES ----------------------------------------------
// const {User, Post, Page} = database.models; // es necesario para realizar las RELACIONES

// estamos creando una relación de uno a muchos
// User.hasMany(Post); // se traduce como decir que un USUARIO tiene muchos POSTS
// Post.belongsTo(User) // pero un POST pertenece a un solo USUARIO

// RELACION de muchos a muchos 
// como primer parametro recibe el atributo al cual se relaciona 
//y como segundo parametro el nombre de la tabla que los relaciona 
// User.belongsToMany(Page, { through: "UserPage" }); // un usuario tiene muchas paginas 
// Page.belongsToMany(User, { through: "UserPage" }); // una pagina tiene muchos usuarios


// module.exports = {database, ...database.models}; 
// // aparte de yo exportar la base de datos (la conexion) también exporto los modelos, los cuales me permitiran 
// // usarlo en mi ruta

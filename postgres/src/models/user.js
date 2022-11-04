//4 aqui estoy modularizando mis modelos, que son los que crean mis tablas, por ello me creo una
// función qu adentro define mi modelo, funcion para cada MODELO

const { DataTypes } = require('sequelize');

// función que recibe a mi instancia de sequelize y esta instancia dentro define el modelo
const User = (database) =>{
    database.define('User', { //creo MODELO, defino los atributos, pero esto se puede modularizar.
        id: {
            type: DataTypes.INTEGER, // olibatoriamente se debe llamar a DataTypes (que es un objeto) para definir el tipo de dato
            primaryKey: true,
            autoIncrement: true, // autoincremental
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false, // no se le permite null
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // unico
        },
        birth:{
            type: DataTypes.DATEONLY, // para que solo use el tipo fecha y no hora
            allowNull: false,
        }, 
    }, {
        timestamps: false,// objeto de configuración para que no me apezca createAT y updateAt
        }, ); 
};

// pero esta función tiene que ser ejecutada donde se definio mi conexión entre mi a mi DB con la instancia de seqielize
module.exports = User;
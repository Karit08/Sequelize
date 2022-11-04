const { DataTypes } = require('sequelize');

const Post = (database) => {
    database.define('Post', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        constents: {
            type: DataTypes.STRING,
            allowsNull: false,
        },
    });
};

module.exports= Post;
//1  creamos Server
const express = require('express'); // 1
const server = express (); // 2
const { User, Post, Pages } = require('./db');
const Page = require('./models/Page');

server.use(express.json());
server.use(morgan('dev'));

// -----------------------------------------  GET  ---------------------------------------------------

server.get('/users', async(req, res) =>{ // importante que sea async await
    try{
       const { name } = req.query;
    //    const { name, last_name } = req.query;
       if(!name){
        // const users = await User.findAll(); 
        //busca todo los registros de USUARIO y no los devuelve en un Array
        
        // const users = await User.findAll({
        //     attributes: ["id", "name", "last_name"],
        // }); //---------------------- IMPORTANTE
        // de esta forma le indico a findAll que me busque todo, pero que solo 
        //me muestre en especifico esas propiedades name y last_name _--> los atributos se escriben con comillas
        
        // const users = await User.findAll({
        //     attributes: {exclude: ["birth"]},
        // }); // esta forma trae todo pero excluye al atributo 'birth'

        const users = await User.findAll({
            attributes: ["id", "name", "last_name"],
            include:[{
                model: Pages, // incluimos al modelo PAGES, el cuál queremos que lo muestres en el modelo de usuario
                attributes: ["page_name"], // sin embargo de sus atributos solo quiero que me muestres el atributo page_name
            }],
        });

        res.status(200).send(users);
       }else{
        const users = await User.findAll({
            where: { // busca todo donde el (criterio sea nombre) sea:
                name: name,
                // last_name, // where puede recibir muchos atributos
            },
        }); 
        res.status(200).send(users);
       }
    }catch(e){
        res.status(400).send(e.message);
    }
});


server.get('/users:id', async(req, res) =>{ // importante que sea async await
    try{
        const { id } = req.params;
        const user = await User.findByPk(); // siempre referencia al modelo para poder agregarle en metodo
        //busca todo los registros de USUARIO y no los devielve en un Array
        if(!user) throw new Error ("User does not exist"); 
        // si no encuentra al usuario o esta vacio envio un throw (porque en realidad esto no es un error
        // solo que esta vacio)
        res.status(200).send(user);
    }catch(e){
        res.status(400).send(e.message);
    }
});

server.get("/users/findOrCreate", async (req, res) => {
    try {
        const { name, last_name, birth} = req.body;
        const user = await User.findOrCreate({
            where: { name }, // Criterio de busqueda
            defaults: { // si no existe lo creamos especificando los valores que tomaran los otros campos
                last_name, 
                // last_name: last_name, 
                birth,
                // last_name: last_name, 
            },
        });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(e.message);
    }
})

// -----------------------------------------  POST  ---------------------------------------------------

server.post('/user', async (req, res) =>{
//  crear usuario en la base de datos   
    try{
        const  {name, last_name, birth} = req.body;
        const newUser = await User.create({ name, last_name, birth}); 
        // creamos el usuario en la base de datos, pasandolo a mi modelo USER la info (atributos) que recibo por body
        // es necesario el async await para no enviar respuestas vacias :)
        res.status(201).send(newUser);
    }catch(e){
        res.status(400).send(e.message);
    }
});

//post para crear varios usuarios juntos
server.post('/users/bulk', async (req, res) =>{
    try {
        const data = req.body;
        const newUsers = await User.bulkCreate(data);
        //crear registros juntos a través de un array de objetos, por lo tanto recibe un ARRAY
        res.status(201).send(newUsers);
    } catch (error) {
        res.status(400).send(e.message);
    }
})

server.delete('/users', async (req, res) =>{
    try{
        const { id } = req.body;
        const user = await User.findByPk(id); // busco un atributo de acuerdo a si Primary Key (id) y viene en un objeto
        // const user = await User.findOne({
        //     where : { id: id},
        // }); // otra forma de realizarlo con .findOne el cual busca el primer atributo que encuentra con las caracteristicas
        await user.destroy(); // elimina el atributo
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e.message);
    }
});

server.post("/posts", async (req, res) =>{
    try {
        const { title, contents, userId } = req.body;
        // post crea una tabla con id, title y contents, sin embargo aunque el MODELO no tiene
        //userId (viene del cliente), es necesario crearlo porque existe relación entre POST y USER
        const newPost = await Post.create({title, contents}); // cree mi post
        await newPost.setUser(userId); 
        // (set + nombre del modelo que queremos setear) setUser metodo que setea el id del usuario correspondiente
        // se creo el Pots pero fue creado por el usuario con userID ---> pues existe la relación
        // porque post si necesit identificar quien lo creo

        // const user = await User.findByPk(userId);
        // user.addPosts([4, 5, 6]); // es cuando quiero agregarle o indicarle muchos post
        res.status(201).send(newPost);
    } catch (error) {
        res.status(400).send(e.message);
    }
});

server.post("/pages", async(req, res) =>{
    const data = req.body;
    const newPages = await Page.bulkCreate(data);
    res.send(newPages);
})

module.exports = server; // 3 exportamos el servidor
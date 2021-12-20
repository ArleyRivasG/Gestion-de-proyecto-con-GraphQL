import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './db/db';
import { typeDefs } from './graphql/types';
import {resolvers} from './graphql/resolver';

dotenv.config();

//Definimos un servidor de Apollo Server
const server = new ApolloServer({

    //pasamos los Tipos que es  cada una de las definiciones que tiene nuestro modelo
    //y las propiedades resolvers (reemplaza a los controladores en Api Rest) 
    typeDefs: typeDefs,
    resolvers: resolvers,
});

//definimos aplicacion de express
const app = express();

//usamos el middleware express.json para permitir que los request entre y salgan de tipo JSON
app.use(express.json());

//utilizamos el middleware del cors para poder hacer request desde muchos origenes
app.use(cors());

//corremos nuestra aplicacion de express (servidor)
app.listen({ port: process.env.PORT || 4000 }, async () => {

    //nos conectamos a la BD
    await conectarBD();

    //prendemos el servidor de apollo para poder generar esa unica ruta en el backend y acceder a nuestra aplicacion
    await server.start();

    // agregamos middleware adicionales al servidor de apollo, en este caso los de express para usarlos como siempre con express
    server.applyMiddleware({ app });

    console.log('servidor listo');

});
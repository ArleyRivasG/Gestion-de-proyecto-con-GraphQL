// Los resolver es como ejecuta esa instrucción o cuale es la función que se ejecuta por dentro
//aqui es como si estuviesemos haciendo los controladores

import { UserModel } from "../models/user";

const resolvers = {
    Query: {
        Usuarios: async (parent, args) =>{
          const usuarios= await UserModel.find();

        return usuarios;
        }
    },

    Mutation: {
        crearUsuario: async (parent, args) =>{
            const usuarioCreado = await UserModel.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                estado: args.estado,
                rol: args.rol,

            });
            return usuarioCreado;
            
        }
    }
    // Mutation: {

    // }
};

export { resolvers };
// Los resolver es como ejecuta esa instrucción o cuale es la función que se ejecuta por dentro
//aqui es como si estuviesemos haciendo los controladores

import { UserModel } from "../models/user";

const resolvers = {
    Query: {
        Usuarios: async (parent, args) => {
            const usuarios = await UserModel.find();

            return usuarios;
        },
        Usuario: async (parant, args)=>{
            const usuario = await UserModel.findOne({_id: args._id});        
            return usuario;
        } 
    },

    Mutation: {
        //Mutacion para crear usuario, debe llamarse igual a la creada en types.ts con opcion a definir el estado (revisar, solo guarda estado por defecto en mongo atlas)
        crearUsuario: async (parent, args) => {
            const usuarioCreado = await UserModel.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                //estado: args.estado,
                rol: args.rol,


            });
            if (Object.keys(args).includes('estado')) {
                usuarioCreado.estado = args.estado;
            }
            return usuarioCreado; 
        },

        //mutacion para editar usuario
        editarUsuario: async (parent, args) => {
            const usuarioEditado = await UserModel.findByIdAndUpdate(args._id,{
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
                estado: args.estado,
            });
            return usuarioEditado;
        },

        //Mutacion para eliminar usuario
        eliminarUsuario: async (parent, args) => {


            if (Object.keys(args).includes('_id')) {
                const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
                return usuarioEliminado;
            } else if (Object.keys(args).includes('correo')) {
                const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo });
                return usuarioEliminado;
            }

        },
    },

};

export { resolvers };
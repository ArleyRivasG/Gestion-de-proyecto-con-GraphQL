// Los resolver es como ejecuta esa instrucción o cuale es la función que se ejecuta por dentro
//aqui es como si estuviesemos haciendo los controladores

import { ProjectModel } from "../models/project";
import { UserModel } from "../models/user";

const resolvers = {
    Query: {
        Usuarios: async (parent, args) => {
            const usuarios = await UserModel.find();
            return usuarios;
        },
        Usuario: async (parant, args) => {
            const usuario = await UserModel.findOne({ _id: args._id });
            return usuario;
        },
        // paso 3 proyecto
        Proyectos: async (parent, args) => {
            const proyectos = await ProjectModel.find().populate('lider');
            return proyectos;
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
            const usuarioEditado = await UserModel.findByIdAndUpdate(args._id, {
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

        //Mutacion para crear un proyecto con sus objetivos
        crearProyecto: async (parent, args) =>{
            const proyectoCreado = await ProjectModel.create({
                nombre: args.nombre,
                presupuesto: args.presupuesto,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                estado: args.estado,
                fase: args.fase,
                lider: args.lider,
                objetivos: args.objetivos

            });
            return proyectoCreado;
        }
    },

};

export { resolvers };
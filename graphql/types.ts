// Los types son las definiciones, las declaración de cada una de las instrucciones
// aqui hacemos una copia de nuestros esquemas 
//con esto le decimos a graphQl cuales son nuestros tipos para que el pueda hacer la documentacion
import { gql } from 'apollo-server-express';

const typeDefs = gql`

scalar Date

enum Enum_EstadoUsuario{
    PENDIENTE
    AUTORIZADO
    NO_AUTORIZADO
}

enum Enum_Rol{
    ESTUDIANTE
    LIDER
    ADMINISTRADOR
}
enum Enum_EstadoProyecto {
    ACTIVO 
    INACTIVO 
}

enum Enum_FaseProyecto {
    INICIADO 
    DESARROLLO 
    TERMINADO
    NULO
}

enum Enum_TipoObjetivo {
    GENERAL 
    ESPECIFICO 
}

type Usuario{ #el ! es para campos required
# GraphQl exige el ID en mayuscula que a su vez significa que es llave primaria
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    estado: Enum_EstadoUsuario
    rol: Enum_Rol!
    
 }

# paso 1 Proyecto
type objetivos{
    _id: ID!
    descripcion:String!
    tipo:Enum_TipoObjetivo!
}
type Proyecto {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio:Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
    lider: Usuario!
    objetivos:[objetivos]
}
#Definimos los tipos de los Querys de las mutaciones  
 type Query{
    #  el Usuarios es el mismo nombre del resolver y decimos que ese query devuelve un arreglo de usuarios del tipo arriba definido
     Usuarios:[Usuario]
     Usuario(_id:String!):Usuario
    #  paso 2 Proyecto 
     Proyectos:[Proyecto]
 }

 type Mutation{
    #  la mutacion crearUsuario no devuelve un arreglo de usuarios por eso solo ponemos Usuario
     crearUsuario(
        nombre: String!
        apellido: String!
        identificacion: String!
        correo: String!
        estado: Enum_EstadoUsuario
        rol: Enum_Rol!
     ):Usuario

     editarUsuario(
        #  con el _id busco el usuario a editar
         _id: String! 
        #  los demas campos los pido para  editarlos
        nombre: String!
        apellido: String!
        identificacion: String!
        correo: String!
        rol: Enum_Rol!
        estado: Enum_EstadoUsuario!
     ):Usuario

     eliminarUsuario(_id:String, correo:String):Usuario

     crearProyecto(
         nombre:String!
         presupuesto:Float!
         fechaInicio: Date!
         fechaFin:Date!
         estado:Enum_EstadoProyecto!
         fase:Enum_FaseProyecto!
        # El String hace referencia al ID  de un usuario que 
        # ya debe estar creado y el mongoose lo vuelte al ObjectID de Usuario
         lider:String!
        #  objetivos:String
     ):Proyecto

    
 }
`;

export { typeDefs };
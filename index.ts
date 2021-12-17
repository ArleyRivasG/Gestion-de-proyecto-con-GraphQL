import conectarBD from './db/db';
import { UserModel } from './models/user';
import { Enum_Rol, Enum_TipoObjetivo } from './models/enums';
import { ProjectModel } from './models/project';
import { isPropertyDeclaration } from 'typescript';
import { ObjectId } from 'mongoose';
import { ObjetiveModel } from './models/objective';

const crearProyectoConObjetivos = async () =>{
    const proyectoCreado = await ProjectModel.create({
        nombre: 'Proyecto mintic 2022',
        fechaInicio: new Date('2021/11/01'),
        fechaFin: new Date ('2022/12/01'),
        presupuesto: 12000000,
        lider: '61bab8ac7812672ce3545c8f'

    });

    const objetivoGeneral = await ObjetiveModel.create({
        descripcion:' Este es el objetivo general',
        tipo: Enum_TipoObjetivo.general,
        proyecto: proyectoCreado._id,
    });
    const objetivoEspecifico1 = await ObjetiveModel.create({
        descripcion:' Este es el objetivo especifico 1',
        tipo: Enum_TipoObjetivo.especifico,
        proyecto: proyectoCreado._id,
    });
    const objetivoEspecifico2 = await ObjetiveModel.create({
        descripcion:' Este es el objetivo especifico 2',
        tipo: Enum_TipoObjetivo.especifico,
        proyecto: proyectoCreado._id,
    });
    console.log('El proyecto creado con sus objetivos es: ', proyectoCreado);
}
    


const main = async () => {
    await conectarBD();
     //Consultar proyecto con objetivos por debajo
    const proyecto = await ProjectModel.findOne({ _id: '61bbc6e2a71d3757cdb1b84f'});
    console.log('El proyecto que encontre fue:' , proyecto);
    
    //
    const objetivosProyecto = await ObjetiveModel.find({project:'61bbc6e2a71d3757cdb1b84f'});
    console.log('Los objetivos del proyecto son: ' , objetivosProyecto);

    const proyectoConObjetivos = {proyecto:proyecto, objetivos:objetivosProyecto};
    console.log('El proyecto con sus objetivos es: ' , proyectoConObjetivos);
    
};

main();

// CREAR PROYECTOS Y OBJETIVOS
   //CREAR PROYECTO CON OBJETIVOS DENTRO 

    // const objectivo = await ObjetiveModel.create({
    //    descripcion: 'Este es el objetivo especifico',
    //    tipo: Enum_TipoObjetivo.especifico,
    // });

    // // CREAR PROYECTO y REFERENCIAR OBJETIVOS DESDE PROYECTOS
    // ProjectModel.create({
    //     nombre: 'proyecto 3',
    //     presupuesto: 340,
    //     fechaInicio: Date.now(),
    //     fechaFin: new Date('2022/11/10'),
    //     lider: '61bab8ac7812672ce3545c8f',
    //     objetivos:[
    //         '61bbadcff13ad28997e83ab7',
    //         '61bbadfeb2c2fc706b1a428d',
    //     ]
    // }).then((p)=>{
    //     console.log('Proyecto creado ', p);
    // }).catch((e)=>{
    //     console.log('Error creando proyecto ', e);
    // });
  
    // const proyecto = await ProjectModel.find({nombre: 'proyecto 3'})
    // .populate('lider')
    // .populate('objetivos');
    //  console.log('El proyecto 3 es: ' , JSON.stringify(proyecto));
  
    // // Borrar esto ya nos sirve (// // )
    // // const proyecto: any = await ProjectModel.find({nombre: 'proyecto 1'});
    // // console.log('El proyecto es: ' ,  proyecto);

    // // const lider = await UserModel.find({_id: proyecto[2].lider});
    // // console.log(' el lider del proyecto es: ', lider);


// CREAR UN USUARIO
    // await UserModel.create({
    //     correo: "carmeng@unip.com.co",
    //     identificacion: '1444156416',
    //     nombre: 'carmensa',
    //     apellido: 'Granado 2',
    //     rol: Enum_Rol.lider,
    // })
    //     .then((u) => {
    //         console.log('usuario creado ', u);
    //     }).catch((e) => {
    //         console.log('error creado el usuario ', e);
    //     });

    //OBTENER LOS USUARIOS
    // await UserModel.find() //busqueda especifica
    //     .then((u)=>{
    //         console.log('usuario' , u);
    //     })
    //     .catch((e)=>{
    //         console.error('error obteniendo los usuarios', e);
    //     });

    //OBTENER UN USUARIO
    // await UserModel.find({identificacion:'1111807577'}) //busqueda especifica
    // .then((u)=>{
    //     console.log('usuario' , u);
    // })
    // .catch((e)=>{
    //     console.error('error obteniendo los usuarios', e);
    // });

    //OBTENER UN USUARIO
    // await UserModel.findOne({identificacion:'111807577'}) //busqueda especifica
    // .then((u)=>{
    //     console.log('usuario encontrado: ' , u);
    // })
    // .catch((e)=>{
    //     console.error('error al buscar usuario: ', e);
    // });

    // ACTUALIZAR UN USARIO
    // await UserModel.findOneAndUpdate(
    //     { identificacion: '56416' },
    //     {
    //         nombre: 'Wilbert',
    //         apellido: 'Granado Rivas',
    //     }
    // ).then((u)=>{
    //     console.log('Usuario Actualizado: ', u);
    // }).catch((e)=>{
    //     console.log('Error al actualizar usuario ' ,  e)
    // });


    //ELIMINAR UN USUARIO
    // await UserModel.findOneAndDelete({
    //     correo: 'arri@uni.com'
    // }).then((u) => {
    //     console.log('usuario eliminado: ', u);
    // }).catch((e) => {
    //     console.error('Error al eliminar usuario ', e);
    // });
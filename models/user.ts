import { Schema, model } from 'mongoose';
import {Enum_Rol} from './enums';



interface User{
    correo: string;
    identificacion: string;
    nombre:string;
    apellido: string;
    rol: Enum_Rol;
}

const userSchema = new Schema <User>({
    correo: {
        type: String,
        required: true,
    },
    identificacion: {
        type: String,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    rol: {
        type:String,
        required:true,
        enum: ['Estudiante', 'Líder', 'Administrador'],
    },
});

const UserModel = model('user', userSchema);
export {UserModel};
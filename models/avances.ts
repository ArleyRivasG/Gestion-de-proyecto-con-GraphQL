import { Schema, model } from 'mongoose';
import { ProjectModel3 } from './project3';
import { UserModel } from './user';
interface Avance {
    protecto: Schema.Types.ObjectId,
    fecha: Date,
    descripcion: string;
    observaciones: [string];
    creadoPor: Schema.Types.ObjectId;

}

const advancementSchema = new Schema<Avance>({
    fecha: {
        type: Date,
        required: true,

    },
    descripcion: {
        type: String,
        required: true,
    },
    observaciones: [
        {
            type: String
        },
    ],
    protecto:{
        type: Schema.Types.ObjectId,
        ref: ProjectModel3,
        required:true,
    },
    creadoPor:{
        type:Schema.Types.ObjectId,
        ref: UserModel,
        required:true,
    },

})

const AdvancementModel = model ('avance', advancementSchema );

export {AdvancementModel}

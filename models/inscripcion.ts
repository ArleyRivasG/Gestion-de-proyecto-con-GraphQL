import { Schema, model } from 'mongoose'
import { Enum_EstadoInscripcion } from './enums';
import { ProjectModel3 } from './project';
import { UserModel } from './user';

interface Inscription {
    estado: Enum_EstadoInscripcion;
    fechaIngreso: Date;
    fechaEgreso: Date;
    proyecto: Schema.Types.ObjectId;
    usuario: Schema.Types.ObjectId;
}

const InscripcionSchema = new Schema<Inscription>({


    estado: {
        type: String,
        enum: Enum_EstadoInscripcion,
        required: true,
    },
    fechaIngreso: {
        type: Date,
        required: true,
    },
    fechaEgreso: {
        type: Date,
        required: true,
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: ProjectModel3,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
});

const InscriptionModel = model('inscripcion', InscripcionSchema);

export { InscriptionModel };
// don´t use this model on projects

import { Schema, model } from "mongoose";
import { Enum_TipoObjetivo } from "./enums";


interface objetivo{
    descripcion: string;
    tipo: Enum_TipoObjetivo;
    // proyecto: Schema.Types.ObjectId;
}

const objectiveSchema = new Schema<objetivo>({
    descripcion:{
        type: String,
        required: true,
    },
    tipo:{
        type: String,
        enum: Enum_TipoObjetivo,
        required: true,
    },
    // proyecto:{
    //     type: Schema.Types.ObjectId,
    //     ref: ProjectModel,
    // },
});

const ObjetiveModel = model('objetivo', objectiveSchema);

export {ObjetiveModel};
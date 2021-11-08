import mongoose, {Schema} from 'mongoose';//import mongoose and Schema of mongose

const categorySchema = new Schema({ //we define the schema categorySchema  
    name:{
        type:String,
        maxlength:50,
        unique:true,
        required:true,
    },
    description:{
        type:String,
        maxlength:255
    },
    state:{
        type:Number,
        default:1
    },
    createdAt:{//fecha de creacion, fecha actual por defecto
        type:Date,
        default:Date.now
    },
});

const Category = mongoose.model('category',categorySchema);//conversion a modelo

export default Category;//exportamos el modelo
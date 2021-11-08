import mongoose,{Schema} from 'mongoose';

const articleSchema = new Schema({//creamos el esquema

    category:{
        type: Schema.ObjectId, 
        ref: 'category' //referancia a el modelo category (equal relacion en sql)
    },
    code:{
        type: String, 
        maxlength: 64
    },
    name:{
        type: String, 
        maxlength: 50, 
        unique: true, 
        required: true
    },
    description:{
        type: String, 
        maxlength: 255
    },
    price_sale:{
        type: Number,
         required: true
        },
    state:{
        type: Number, 
        default: 1
    },
    stock:{
        type: Number, 
        default: 1
    },
    createdAt:{
        type: Date, 
        default: Date.now
    }
});

const Article = mongoose.model('article',articleSchema);//convertimos el esquema en Modelo

export default Article;
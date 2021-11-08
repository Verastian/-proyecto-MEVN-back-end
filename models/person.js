import mongoose, { Schema } from 'mongoose';
const personSchema = new Schema({
    personType: {
        type: String,
        maxlength: 20,
        required: true
    },//referancia a el modelo category (relacion en sql)
    name: {
        type: String,
        maxlength: 50,
        unique: true,
        required: true
    },
    documentType: {
        type: String,
        maxlength: 20
    },
    documentNum: {
        type: String,
        maxlength: 20
    },
    address: {
        type: String,
        maxlength: 70
    },
    phone: {
        type: String,
        maxlength: 20
    },
    email: {
        type: String,
        maxlength: 50,
        unique: true,
    },
    state: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Person = mongoose.model('person', personSchema);

export default Person;
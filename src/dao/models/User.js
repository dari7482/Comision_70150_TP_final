import mongoose from 'mongoose';

const collection = 'Users';

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    pets: {
        type: [
            {
                _id: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'Pets'
                }
            }
        ],
        default: []
    },
    documents: [
        {
            name: {
                type: String, // Nombre del documento
                //required: true,
            },
            reference: {
                type: String, // Referencia o ruta al archivo/documento
                //required: true,
            },
        },
    ],
    last_connection: {
        type: String,

    }
})

const userModel = mongoose.model(collection, schema);

export default userModel;
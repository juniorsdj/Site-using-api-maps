const restful = require('node-restful')
const mongoose = restful.mongoose


// const coordenadasSchema = new mongoose.Schema({
//     lat: {
//         type: String,
//         required: false
//     },
//     lng: {
//         type: String,
//         required: false
//     }
// })


const sgaSchema = new mongoose.Schema({
    Rua: {
        type: String,
        required: false
    },
    Numero: {
        type: Number,
        min: 1,
        max: 99999,
        required: false
    },
    Bairro: {
        type: String,
        required: false
    },
    Cep: {
        type: Number,
        required: false
    },
    Cidade: {
        type: String,
        required: false
    },
    Estado: {
        type: String,
        required: false
    },
    Mensagem: {
        type: String,
        required: false
    },
    Foto: {
        type: String,
        required: false
    },
    lat:{
        type: Number,
        required: false
    },
    lng:{
        type: Number,
        required: false
    }
})

module.exports = restful.model('sga', sgaSchema)
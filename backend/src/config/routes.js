const express = require('express')

module.exports = server =>{
    //DEFINIR URL BASE
    const router = express.Router()
    server.use('/api', router)

    //Rotas para o registro do lixo
    const sga = require('../api/sga/sgaServices')
    sga.register(router, '/sga')
}
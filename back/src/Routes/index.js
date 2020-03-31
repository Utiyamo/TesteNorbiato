'use strict'

module.exports = (app) => {
    const inter = require('../Controllers/Interface');

    app.post('/Iniciar/', inter.iniciar_contagem);
}
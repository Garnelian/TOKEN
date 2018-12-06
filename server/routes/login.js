const express = require('express');

const _ = require('underscore');

const app = express();

const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {

    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, UsuarioDB) => {
        if (err) {
            return res.json({
                ok: false,
                err: {
                    mesage: 'Usuario incorrecto'
                }
            })
        };
        if (body.password == UsuarioDB.password) {
            let tokeng = jwt.sign({
                usuario: UsuarioDB
            }, 'secret', { expiresIn: 3600 });
            res.json({
                ok: true,
                UsuarioDB,
                token: tokeng
            })
        } else {
            return res.json({
                ok: false,
                err: {
                    mesage: 'Contraseña incorrecta'
                }
            })
        }
    });
});

module.exports = app;
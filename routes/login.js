const express = require('express');
const colors = require('colors');
const Google = require('../services/google');
const firebase = require('../services/firebase');
//const user = require('../models/user')


const app = express();
const Firebase = new firebase();

app.post('/google', async(req, res) => {
    let token = req.body.token;
});

app.post('/', async(req, res) => {
    var User = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        img: req.body.img,
        access: req.body.access
    }
    try {
        var verify = await Firebase._canCreate(User.email);
        //usuario no existe crearlo
        if (verify['exist']) {
            let result = await Firebase.create(User);
            console.log('Server: '.blue.bold, 'Firebase'.blue, '['.bold, colors.green(result), ']'.bold);
            return res.status(200).json({ 'ok': true, 'sts': 'Usuario creado' });
        }
        //usuario existe checar access para ver si puede autenticarse
        else {
            if (verify['access'] == User.access) {
                return res.status(202).json({ 'ok': true, 'sts': 'Go ahead' });
            } else {
                return res.status(401).json({ 'ok': false, 'sts': 'Try again' });
            }
        }

    } catch (e) {
        console.log('Server: '.blue.bold, 'Firebase'.blue, '['.bold, colors.red(e), ']'.bold);
        return res.sendStatus(500);
    }

});

module.exports = app;
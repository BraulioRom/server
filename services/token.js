const jwt = require('jsonwebtoken');

const token = jwt.sign(dataUsuario, 'see-sdkjansdnas', { expiresIn: 14400 });


exports.verifyToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, 'see-sdkjansdnas', (er, dec) => {
        if (er) {
            return res.status(401).json({
                ok: false,
                msg: 'Token incorrecto',
                errors: er
            });
        }

        req.usuario = dec.usuario;

        next();
    });
}
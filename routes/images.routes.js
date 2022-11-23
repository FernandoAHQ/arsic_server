const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { getImage } = require('../controllers/images.controllers');
const { validarADMIN_ROLE, validarJWT } = require('../middlewares/validar-jwt.middleware');

const router = Router();







router.get('/:coleccion/:id', getImage);




module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { uploadImage } = require('../controllers/uploads.controllers');
const { validarADMIN_ROLE, validarJWT } = require('../middlewares/validar-jwt.middleware');

const router = Router();







router.post('/:coleccion/:id', uploadImage);




module.exports = router;
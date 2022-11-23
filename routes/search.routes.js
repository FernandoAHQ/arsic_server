const { Router } = require('express');
const { searchBitacora } = require('../controllers/search.controllers');
const { validarADMIN_ROLE, validarJWT } = require('../middlewares/validar-jwt.middleware');

const router = Router();


router.get('/:query', [validarJWT], searchBitacora)

module.exports = router;
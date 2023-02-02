const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { getAll, create, update, del } = require('../controllers/departments.controllers');
const { validarADMIN_ROLE, validarJWT } = require('../middlewares/validar-jwt.middleware');

const router = Router();


router.get('/all',[validarJWT, validarADMIN_ROLE], getAll);

router.post('/create', [
    check('name', 'El name es requerido.').not().isEmpty(),
    check('ubication', 'El ubication es requerido.').not().isEmpty(),
    check('user', 'El user es requerido.').not().isEmpty(),
    validarCampos,
    validarJWT,
    validarADMIN_ROLE
], create);

router.delete('/delete/:id',del)

router.put('/update/:id', [
//    validarJWT,
  //  validarADMIN_ROLE
], update);




module.exports = router;
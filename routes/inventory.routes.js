const {Router} = require('express');
const { validarADMIN_ROLE, validarJWT } = require('../middlewares/validar-jwt.middleware');
const { create, getAll, edit, getPieces, deactivate } = require('../controllers/inventory.controllers');

const router = Router();

router.get('/specs',// [ validarJWT, validarADMIN_ROLE ], 
getPieces);

router.get('/:category', [ validarJWT, validarADMIN_ROLE], getAll );

router.post('/:category/register', [ validarJWT, validarADMIN_ROLE ], create);


router.post('/:category/update', [ validarJWT, validarADMIN_ROLE ], edit);

//router.delete('/:category/delete/:id', deactivateComputer);
 router.delete('/:category/delete/:id',  deactivate);


module.exports = router;
const {Router} = require('express');
const { check } = require('express-validator');
const { validarADMIN_ROLE, validarJWT } = require('../middlewares/validar-jwt.middleware');
const { create, getAll, registerTask, assign, unassign, getAllRegistered } = require('../controllers/tasks.controllers');
const { validarCampos } = require('../middlewares/validar-campos.middleware');

const router = Router();

router.get('/', //[ validarJWT, validarADMIN_ROLE], 
getAll );

router.get('/registered',// [ validarJWT, validarADMIN_ROLE], 
getAllRegistered );

router.post('/newTask', 
[
    check('name', 'El campo name es requerido.').not().isEmpty(),
    check('description', 'El campo description es requerido.').not().isEmpty(),
    check('asignments', 'El campo asignments es requerido.').not().isEmpty(),
    validarCampos,
    validarJWT, 
    validarADMIN_ROLE 
], 
create);

router.post('/logTask',// [ validarJWT, validarADMIN_ROLE ], 
registerTask);


router.post('/assign', 
[ validarJWT, validarADMIN_ROLE ], 
assign);


router.post('/unassign',
[
    check('task', 'El campo task es requerido.').not().isEmpty(),
    check('assignment', 'El campo asignment es requerido.').not().isEmpty(),
    validarCampos,
    //validarJWT, 
    //validarADMIN_ROLE 
],
unassign);


module.exports = router;
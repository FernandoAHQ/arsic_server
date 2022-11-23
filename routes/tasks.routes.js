const {Router} = require('express');
const { validarADMIN_ROLE, validarJWT } = require('../middlewares/validar-jwt.middleware');
const { create, getAll, registerTask, assign, getAllRegistered } = require('../controllers/tasks.controllers');

const router = Router();

router.get('/', [ validarJWT, validarADMIN_ROLE], 
getAll );

router.get('/registered',// [ validarJWT, validarADMIN_ROLE], 
getAllRegistered );

router.post('/newTask', [ validarJWT, validarADMIN_ROLE ], 
create);

router.post('/logTask',// [ validarJWT, validarADMIN_ROLE ], 
registerTask);


 router.post('/assign', [ validarJWT, validarADMIN_ROLE ], 
 assign);


module.exports = router;
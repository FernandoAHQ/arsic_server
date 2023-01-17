const { Router } = require('express');
const { getAllByRoleOne, getAllByRole, update, getUsersIsActive, getUsersWithoutDepartment, changeIsActive, deactivate, getActiveByRole } = require('../controllers/users.controller');
const { validarADMIN_ROLE, validarJWT } = require('../middlewares/validar-jwt.middleware');

const router = Router();


router.get('/isActive/:id', changeIsActive);

router.get('/all/active', getUsersIsActive);

router.get('/all/users/', getUsersWithoutDepartment);

router.get('/allz/:role', getAllByRoleOne);

router.get('/all/:role', getAllByRole);

router.get('/all/active/:role', getActiveByRole);

router.put('/update/:id', [
    validarJWT,
    validarADMIN_ROLE
], update);


router.delete('/delete/:id', [
   // validarJWT,
   // validarADMIN_ROLE
], deactivate);


module.exports = router; 
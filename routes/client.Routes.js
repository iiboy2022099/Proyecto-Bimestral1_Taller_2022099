const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeUsuarioById, esRolValido } = require('../helpers/db-validators');

const { clientesPost, clientesGet, getClienteByid, clientesPut } = require('../controller/clientController');

const router = Router();

router.get("/", clientesGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getClienteByid);

    router.put(
        "/:id",
        [
            check("id", "El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeUsuarioById),
            validarCampos
        ], clientesPut);
    

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("direccion", "La direcion es obligatorio").not().isEmpty(), 
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], clientesPost);

module.exports = router;
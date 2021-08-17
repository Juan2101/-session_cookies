const express = require('express');
const router = express.Router();

const { index, userData, thanks, destroy } = require('../controllers/indexController');

const { check } = require("express-validator");

const validate = [
  
  check("name")
    .notEmpty().withMessage("Debes ingresar un nombre"),

  check("email")
    .notEmpty().withMessage("Debes ingresar un email").bail()
    .isEmail().withMessage("Debes ingresar un email valido"),

  check("color")
    .notEmpty().withMessage("Debes elegir un color"),

  check("age")
    .isInt({ min: 1, max: 99 }).withMessage("Debes ingresar un numero valido")
]

router.get('/', index);
router.post('/', validate, userData);

router.get('/thanks', thanks);
router.get('/destroy', destroy);

module.exports = router;

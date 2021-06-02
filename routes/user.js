const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const tokenController = require("../controllers/token");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const {Token} = require('../helpers');

const token = new Token();



router.post('/signup', validation.signUpValidationRules(), validation.validate, userController.signUp);
router.post('/login', validation.loginValidationRules(), validation.validate, userController.logIn);
router.post('/refresh-token', tokenController.refreshToken);
router.patch('/', token.verifyToken, auth.authorization("user", "admin"),  userController.updateProfile);
router.get('/', token.verifyToken, auth.authorization("user", "admin"),  userController.getProfileData);



module.exports = router;
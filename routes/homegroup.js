const express = require("express");
const router = express.Router();
const homeGroupController = require("../controllers/homegroup");
const auth = require("../middlewares/authorization");
const {Token} = require('../helpers');

const token = new Token();



router.post('/', token.verifyToken,  auth.authorization("user", "admin"), homeGroupController.createHomeGroup);
router.patch('/:id', token.verifyToken,  auth.authorization("user", "admin"), homeGroupController.updateHomeGroup);
router.get('/:id', token.verifyToken,  auth.authorization("user", "admin"), homeGroupController.getOneHomeGroup);
router.get('/', token.verifyToken,  auth.authorization("user", "admin"), homeGroupController.getAllHomeGroup);


module.exports = router;
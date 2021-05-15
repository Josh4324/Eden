const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event");
const auth = require("../middlewares/authorization");
const {Token} = require('../helpers');

const token = new Token();



router.post('/', token.verifyToken,  auth.authorization("user", "admin"), eventController.createEvent);
router.patch('/:id', token.verifyToken,  auth.authorization("user", "admin"), eventController.updateEvent);
router.get('/:id', token.verifyToken,  auth.authorization("user", "admin"), eventController.getOneEvent);
router.get('/', token.verifyToken,  auth.authorization("user", "admin"), eventController.getAllEvent);


module.exports = router;
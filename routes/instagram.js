const express = require("express");
const router = express.Router();
const instagramController = require("../controllers/instagram");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {Token} = require('../helpers');

const token = new Token();



router.post('/', token.verifyToken,  auth.authorization("user", "admin"), upload.single("image"), instagramController.createInstagram);
router.patch('/:id', token.verifyToken,  auth.authorization("user", "admin"), instagramController.updateInstagram);
router.get('/:id', token.verifyToken,  auth.authorization("user", "admin"), instagramController.getOneInstagram);
router.get('/', token.verifyToken,  auth.authorization("user", "admin"), instagramController.getAllInstagram);


module.exports = router;
const express = require("express");
const router = express.Router();
const verseController = require("../controllers/verse");
const auth = require("../middlewares/authorization");
const {Token} = require('../helpers');

const token = new Token();



router.post('/', token.verifyToken,  auth.authorization("user", "admin"), verseController.createVerse);
router.patch('/:id', token.verifyToken,  auth.authorization("user", "admin"), verseController.updateVerse);
router.get('/:id', token.verifyToken,  auth.authorization("user", "admin"), verseController.getVerseWithId);
router.get('/', token.verifyToken,  auth.authorization("user", "admin"), verseController.getAllVerse);


module.exports = router;
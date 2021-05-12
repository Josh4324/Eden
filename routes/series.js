const express = require("express");
const router = express.Router();
const seriesController = require("../controllers/series");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const {Token} = require('../helpers');

const token = new Token();



router.post('/', token.verifyToken,  auth.authorization("user", "admin"), upload.single("image"), seriesController.createSeries);
router.patch('/', token.verifyToken,  auth.authorization("user", "admin"), seriesController.updateSeries);
router.get('/:id', token.verifyToken,  auth.authorization("user", "admin"), seriesController.getOneSeries);
router.get('/', token.verifyToken,  auth.authorization("user", "admin"), seriesController.getAllSeries);


module.exports = router;
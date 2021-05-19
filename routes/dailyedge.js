const express = require("express");
const router = express.Router();
const dailyEdgeController = require("../controllers/dailyedge");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {Token} = require('../helpers');

const token = new Token();



router.post('/', token.verifyToken,  auth.authorization("user", "admin"),upload.single("image"), dailyEdgeController.createDailyEdge);
router.patch('/:id', token.verifyToken,  auth.authorization("user", "admin"), dailyEdgeController.updateDailyEdge);
router.get('/:id', token.verifyToken,  auth.authorization("user", "admin"), dailyEdgeController.getOneDailyEdge);
router.get('/', token.verifyToken,  auth.authorization("user", "admin"), dailyEdgeController.getAllDailyEdge);


module.exports = router;
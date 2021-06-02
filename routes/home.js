const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const auth = require("../middlewares/authorization");
const {Token} = require('../helpers');

const token = new Token();


router.get('/', token.verifyToken,  auth.authorization("user", "admin"), homeController.getHomePosts);



module.exports = router;
const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {Token} = require('../helpers');

const token = new Token();



router.post('/', token.verifyToken,  auth.authorization("user", "admin"),upload.single("image"), blogController.createBlog);
router.patch('/:id', token.verifyToken,  auth.authorization("user", "admin"), blogController.updateBlog);
router.get('/:id', token.verifyToken,  auth.authorization("user", "admin"), blogController.getOneBlog);
router.get('/', token.verifyToken,  auth.authorization("user", "admin"), blogController.getAllBlog);


module.exports = router;
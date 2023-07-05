const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

router.post(
  "/",
  token.verifyToken,
  auth.authorization("admin"),
  upload.single("image"),
  validation.messageValidationRules(),
  validation.validate,
  messageController.createMessage
);
router.patch(
  "/:id",
  token.verifyToken,
  auth.authorization("user", "admin"),
  messageController.updateMessage
);
router.get(
  "/:id",
  token.verifyToken,
  auth.authorization("user", "admin"),
  messageController.getOneMessage
);
router.get(
  "/",
  token.verifyToken,
  auth.authorization("user", "admin"),
  messageController.getAllMessages
);

module.exports = router;

const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/message':
 *  post:
 *     tags:
 *     - Message
 *     summary: Create Message
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                  format: binary
 *                topic:
 *                  type: string
 *                  default: topic
 *                series:
 *                  type: string
 *                  default: series
 *                preacher:
 *                  type: string
 *                  default: preacher
 *                audio:
 *                  type: string
 *                  default: audio
 *                youtube:
 *                  type: string
 *                  default: youtube
 *                summary:
 *                  type: string
 *                  default: summary
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *     security:
 *        - bearerAuth: []
 *     description: Only an authenticated user can access this route
 */
router.post(
  "/",
  token.verifyToken,
  auth.authorization("admin"),
  upload.single("image"),
  validation.messageValidationRules(),
  validation.validate,
  messageController.createMessage
);

/**
 * @openapi
 * '/api/v1/message/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Message Id
 *     tags:
 *     - Message
 *     summary: Update Message
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - topic
 *              - series
 *              - preacher
 *              - audio
 *              - youtube
 *              - summary
 *            properties:
 *                image:
 *                  type: string
 *                  format: binary
 *                topic:
 *                  type: string
 *                  default: topic
 *                series:
 *                  type: string
 *                  default: series
 *                preacher:
 *                  type: string
 *                  default: preacher
 *                audio:
 *                  type: string
 *                  default: audio
 *                youtube:
 *                  type: string
 *                  default: youtube
 *                summary:
 *                  type: string
 *                  default: summary
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *     security:
 *        - bearerAuth: []
 *     description: Only an authenticated user can access this route
 */
router.patch(
  "/:id",
  token.verifyToken,
  auth.authorization("admin"),
  messageController.updateMessage
);

/**
 * @openapi
 * '/api/v1/message/{id}':
 *  get:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Message Id
 *     tags:
 *     - Message
 *     summary: Get Message
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *     security:
 *        - bearerAuth: []
 *     description: Only an authenticated user can access this route
 */
router.get(
  "/:id",
  token.verifyToken,
  auth.authorization("user", "admin"),
  messageController.getOneMessage
);

/**
 * @openapi
 * '/api/v1/message':
 *  get:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page Number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: No of items per page
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         description: Topic
 *       - in: query
 *         name: pastor
 *         schema:
 *           type: string
 *         description: Pastor
 *     tags:
 *     - Message
 *     summary: Get All messages
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 *     security:
 *        - bearerAuth: []
 *     description: Only an authenticated user can access this route
 */
router.get("/", token.verifyToken, messageController.getAllMessages);

module.exports = router;

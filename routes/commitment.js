const express = require("express");
const router = express.Router();
const commitController = require("../controllers/commitment");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/commit':
 *  post:
 *     tags:
 *     - Commitment
 *     summary: Experience
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - experience
 *            properties:
 *              experience:
 *                type: string
 *                default: experience
 *     responses:
 *      201:
 *        description: Created
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
router.post("/", token.verifyToken, commitController.createCommit);

/**
 * @openapi
 * '/api/v1/commit/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Commit Id
 *     tags:
 *     - Commitment
 *     summary: update Experience
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - experience
 *            properties:
 *              experience:
 *                type: string
 *                default: experience
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
router.patch("/:id", token.verifyToken, commitController.updateCommit);
router.get(
  "/:id",
  token.verifyToken,
  auth.authorization("user", "admin"),
  commitController.getOneCommit
);

/**
 * @openapi
 * '/api/v1/commit':
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
 *     tags:
 *     - Commitment
 *     summary: Get All commit
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
router.get("/", token.verifyToken, commitController.getAllCommit);

module.exports = router;

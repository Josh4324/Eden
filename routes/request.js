const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/request':
 *  post:
 *     tags:
 *     - Request
 *     summary: request
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - request
 *            properties:
 *              request:
 *                type: string
 *                default: Prayer | Testimonies
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
router.post("/", token.verifyToken, requestController.createRequest);

/**
 * @openapi
 * '/api/v1/request/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Commit Id
 *     tags:
 *     - Request
 *     summary: update Request
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - request
 *            properties:
 *              request:
 *                type: string
 *                default: request
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
router.patch("/:id", token.verifyToken, requestController.updateRequest);
router.get(
  "/:id",
  token.verifyToken,
  auth.authorization("user", "admin"),
  requestController.getOneRequest
);

/**
 * @openapi
 * '/api/v1/request':
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
 *     - Request
 *     summary: Get All requests
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
router.get("/", token.verifyToken, requestController.getAllRequest);

module.exports = router;

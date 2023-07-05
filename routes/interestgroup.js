const express = require("express");
const router = express.Router();
const interestController = require("../controllers/interestgroup");
const auth = require("../middlewares/authorization");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/interest':
 *  post:
 *     tags:
 *     - Interest Group
 *     summary: Create Interest Group
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *                default: Name
 *              description:
 *                type: string
 *                default: Description
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
router.post(
  "/",
  token.verifyToken,
  auth.authorization("admin"),
  interestController.createInterestGroup
);

/**
 * @openapi
 * '/api/v1/interest/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Interest Id
 *     tags:
 *     - Interest Group
 *     summary: update Interest Group
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *                default: Name
 *              description:
 *                type: string
 *                default: Description
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
router.patch("/:id", token.verifyToken, interestController.updateInterestGroup);

/**
 * @openapi
 * '/api/v1/interest/user/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Interest Id
 *     tags:
 *     - Interest Group
 *     summary: Add user to interest group
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
  "/user/:id",
  token.verifyToken,
  interestController.joinInterestGroup
);

router.get(
  "/:id",
  token.verifyToken,
  auth.authorization("user", "admin"),
  interestController.getOneInterestGroup
);

/**
 * @openapi
 * '/api/v1/interest':
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
 *     - Interest Group
 *     summary: Get All Interest Group
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
router.get("/", token.verifyToken, interestController.getAllGroup);

module.exports = router;

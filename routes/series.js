const express = require("express");
const router = express.Router();
const seriesController = require("../controllers/series");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/series':
 *  post:
 *     tags:
 *     - Series
 *     summary: Create Series
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                  format: binary
 *                name:
 *                  type: string
 *                  default: name
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
 *     description: Only an authenticated admin can access this route
 */
router.post(
  "/",
  token.verifyToken,
  auth.authorization("admin"),
  upload.single("image"),
  validation.seriesValidationRules(),
  validation.validate,
  seriesController.createSeries
);

/**
 * @openapi
 * '/api/v1/series/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Post Id
 *     tags:
 *     - Series
 *     summary: Update Series name
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                default: name
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
  seriesController.updateSeries
);

/**
 * @openapi
 * '/api/v1/series/{id}':
 *  get:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Series Id
 *     tags:
 *     - Series
 *     summary: Get Series
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
router.get("/:id", token.verifyToken, seriesController.getOneSeries);

/**
 * @openapi
 * '/api/v1/series':
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
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of series
 *     tags:
 *     - Series
 *     summary: Get All series
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
router.get("/", token.verifyToken, seriesController.getAllSeries);

module.exports = router;

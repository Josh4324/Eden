const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/post':
 *  post:
 *     tags:
 *     - Post
 *     summary: Create Post
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                  format: binary
 *                category:
 *                  type: string
 *                  default: instagram
 *                details:
 *                  type: string
 *                  default: Post Info
 *                link:
 *                  type: string
 *                  default: johndoe@mail.com
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
  postController.createPost
);

/**
 * @openapi
 * '/api/v1/post':
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
 *         name: category
 *         schema:
 *           type: string
 *         description: Category of Post
 *     tags:
 *     - Post
 *     summary: Get All post
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
router.get("/", token.verifyToken, postController.getAllPost);

/**
 * @openapi
 * '/api/v1/post/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Post Id
 *     tags:
 *     - Post
 *     summary: Update Post
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - category
 *              - details
 *              - link
 *            properties:
 *              category:
 *                type: string
 *                default: instagram
 *              details:
 *                type: string
 *                default: Post Info
 *              link:
 *                type: string
 *                default: url link
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
  postController.updatePost
);

/**
 * @openapi
 * '/api/v1/post/image/{id}':
 *  patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Post Id
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                  format: binary
 *     tags:
 *     - Post
 *     summary: Update post image
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
  "/image/:id",
  token.verifyToken,
  auth.authorization("admin"),
  upload.single("image"),
  postController.updatePostImage
);

/**
 * @openapi
 * '/api/v1/post/{id}':
 *  get:
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Post Id
 *     tags:
 *     - Post
 *     summary: Get Post
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
router.get("/:id", token.verifyToken, postController.getOnePost);

module.exports = router;

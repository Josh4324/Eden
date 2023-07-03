const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const tokenController = require("../controllers/token");
const multer = require("multer");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/authorization");
const upload = multer({ dest: "uploads/" });
const { Token } = require("../helpers");

const token = new Token();

/**
 * @openapi
 * '/api/v1/user/signup':
 *  post:
 *     tags:
 *     - User
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *            properties:
 *              firstName:
 *                type: string
 *                default: johndoe
 *              lastName:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post(
  "/signup",
  validation.signUpValidationRules(),
  validation.validate,
  userController.signUp
);
/**
 * @openapi
 * '/api/v1/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post(
  "/login",
  validation.loginValidationRules(),
  validation.validate,
  userController.logIn
);

/**
 * @openapi
 * '/auth/google':
 *  get:
 *     tags:
 *     - User
 *     summary: Social Authentication
 *     responses:
 *      201:
 *        description: Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

//router.post("/refresh-token", tokenController.refreshToken);
/**
 * @openapi
 * '/api/v1/user':
 *  patch:
 *     tags:
 *     - User
 *     summary: Update user
 *     requestBody:
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *            properties:
 *              firstName:
 *                type: string
 *                default: johndoe
 *              lastName:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
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
router.patch("/", token.verifyToken, userController.updateUser);

/**
 * @openapi
 * '/api/v1/user':
 *  get:
 *     tags:
 *     - User
 *     summary: Get user details
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
router.get("/", token.verifyToken, userController.getUserDetails);

/**
 * @openapi
 * '/api/v1/user/verify':
 *  post:
 *     tags:
 *     - User
 *     summary: Verify User Email
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - code
 *            properties:
 *              email:
 *                type: string
 *                default: ade@yahoo.com
 *              code:
 *                type: string
 *                default: 5fgdb
 *     responses:
 *      200:
 *        description: Verified
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post(
  "/verify",
  validation.verifyValidationRules(),
  validation.validate,
  userController.verifyEmail
);

router.post(
  "/reset",
  validation.resetValidationRules(),
  validation.validate,
  userController.reset
);

router.post("/forgot", userController.forgotPassword);

module.exports = router;

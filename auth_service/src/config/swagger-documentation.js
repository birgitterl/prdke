// Model definitions

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *     - username
 *     - password
 *     properties:
 *       username:
 *         type: string
 *         example: Julia
 *       password:
 *         type: string
 *         example: A12345
 */

// User Routes

/**
 *@swagger
 * path:
 *  /api/users:
 *    post:
 *      tags:
 *        - users
 *      summary: Register a new user
 *      parameters:
 *        - in: body
 *          name: body
 *          description: User object that needs to be registered
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        '201':
 *          description: User created
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZhODFhMmQxNTY2NjEwMDNiMDg5OWYyIn0sImlhdCI6MTYwNDg1NTgwOSwiZXhwIjoxNjA1MjE1ODA5fQ.XUZZrYGuUxBk4WQis8VII4GGadFESHwg8Il994WPk04
 *        '400':
 *          description: Bad Request
 *        '403':
 *          description: Forbidden - User exists already
 *        '500':
 *          description: Internal server error
 */

/**
 * @swagger
 * path:
 *   /api/users:
 *     delete:
 *       tags:
 *         - users
 *       summary: Delete all registered users (for dev tests only)
 *       responses:
 *         "200":
 *           description: All users removed
 *         "500":
 *           description: Internal server error
 */

/**
 * @swagger
 * path:
 *   /api/users:
 *     get:
 *       tags:
 *         - users
 *       summary: Get all users
 *       responses:
 *         "200":
 *           description: OK
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: Julia
 *         "404":
 *           description: No users found
 *         "500":
 *           description: Internal server error
 *
 */

// Authentication Routes

/**
 *@swagger
 * path:
 *  /api/auth:
 *    post:
 *      tags:
 *        - auth
 *      summary: Login/authenticate user and get token
 *      parameters:
 *        - in: body
 *          name: body
 *          description: User object that needs to be authenticated
 *          required: true
 *          schema:
 *            $ref: '#/definitions/User'
 *      responses:
 *        '200':
 *          description: OK
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZhODFhMmQxNTY2NjEwMDNiMDg5OWYyIn0sImlhdCI6MTYwNDg1NTgwOSwiZXhwIjoxNjA1MjE1ODA5fQ.XUZZrYGuUxBk4WQis8VII4GGadFESHwg8Il994WPk04
 *        '400':
 *          description: Bad Request
 *        '403':
 *          description: Forbidden - User exists already
 *        '404':
 *          description: Not found - Invalid credentials
 *        '500':
 *          description: Internal server error
 */

/**
 * @swagger
 * path:
 *   /api/auth:
 *     get:
 *       tags:
 *         - auth
 *       summary: Get user by token
 *       security:
 *         - authentication: []
 *       responses:
 *         "200":
 *           description: OK
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: 5fa81a2d156661003b0899f2
 *               username:
 *                 type: string
 *                 example: Julia
 *         "404":
 *           description: User not found by id
 *         "400":
 *           description: Invalid ID supplied
 *         "500":
 *           description: Internal server error
 *
 */

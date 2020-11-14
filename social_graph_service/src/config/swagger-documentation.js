//Modle Definitions

/**
 * @swagger
 * definitions:
 *   Profile:
 *     type: object
 *     required:
 *     - username
 *     - privacy
 *     - notifications
 *     properties:
 *       username:
 *         type: string
 *         example: Julia
 *       gender:
 *         type: string
 *         enum:
 *           - male
 *           - female
 *           - transgender
 *         example: female
 *       birthday:
 *         type: date
 *         example: 1990-01-01
 *       hometown:
 *         type: string
 *         example: Linz
 *       background:
 *         type: string
 *         example: none
 *       privacy:
 *         type: string
 *         enum:
 *           - private
 *           - public
 *         default: public
 *         example: public
 *       notifications:
 *         type: boolean
 *         default: false
 *         example: false
 */

// Profile API

/**
 *@swagger
 * path:
 *  /api/profiles:
 *    post:
 *      tags:
 *        - profiles
 *      summary: Create a new profile or update an existing one
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Profile object to be created or updated
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Profile'
 *      responses:
 *        '200':
 *          description: OK
 *          schema:
 *             $ref: '#/definitions/Profile'
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
 *   /api/profiles/me:
 *     get:
 *       tags:
 *         - profiles
 *       summary: Get my profile
 *       parameters:
 *         - in: query
 *           name: username
 *           required: true
 *           type: string
 *           example: Julia
 *       responses:
 *         "200":
 *           description: OK
 *           schema:
 *             $ref: '#/definitions/Profile'
 *         "404":
 *           description: User not found by id
 *         "400":
 *           description: Invalid ID supplied
 *         "500":
 *           description: Internal server error
 *
 */

/**
 * @swagger
 * path:
 *   /api/profiles:
 *     get:
 *       tags:
 *         - profiles
 *       summary: Get all profiles
 *       responses:
 *         "200":
 *           description: OK
 *           schema:
 *             $ref: '#/definitions/Profile'
 *         "404":
 *           description: No users found
 *         "500":
 *           description: Internal server error
 *
 */

/**
 * @swagger
 * path:
 *   /api/profiles:
 *     delete:
 *       tags:
 *         - profiles
 *       summary: Delete all registered profiles (for dev tests only)
 *       responses:
 *         "200":
 *           description: All users removed
 *         "404":
 *           description: Something went wrong
 *         "500":
 *           description: Internal server error
 */

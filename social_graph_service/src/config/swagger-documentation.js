//Modle Definitions

/**
 * @swagger
 * definitions:
 *   Profile:
 *     type: object
 *     required:
 *     - privacy
 *     - notifications
 *     properties:
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
 *   Message:
 *     type: object
 *     required:
 *     - text
 *     properties:
 *       text:
 *         type: string
 *         example: My first message
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
 *      security:
 *        - authentication: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Profile object to be created or updated
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Profile'
 *      responses:
 *        '201':
 *          description: Profile created / updated
 *          schema:
 *             $ref: '#/definitions/Profile'
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
 *       security:
 *         - authentication: []
 *       responses:
 *         "200":
 *           description: OK
 *           schema:
 *             $ref: '#/definitions/Profile'
 *         "404":
 *           description: No profile found
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
 *             type: array
 *             items:
 *               $ref: '#/definitions/Profile'
 *         "404":
 *           description: No profiles found
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
 *           description: All profiles removed
 *         "500":
 *           description: Internal server error
 */

// Follow API

/**
 *@swagger
 * path:
 *  /api/follow:
 *    post:
 *      tags:
 *        - follow
 *      summary: Create a new follow relationship between two profiles
 *      security:
 *         - authentication: []
 *      parameters:
 *        - in: body
 *          name: text
 *          description: Profile I want to follow
 *          schema:
 *            type: object
 *            required:
 *              - text
 *            properties:
 *              username:
 *                type: string
 *                example: Sepp
 *      responses:
 *        '201':
 *          description: Follow relationship created
 *        '500':
 *          description: Internal server error
 */

// Message API:
/**
 *@swagger
 * path:
 *  /api/messages:
 *    post:
 *      tags:
 *        - messages
 *      summary: Create a new message
 *      security:
 *         - authentication: []
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Message I want to send
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Message'
 *      responses:
 *        '201':
 *          description: Message created
 *        '500':
 *          description: Internal server error
 */

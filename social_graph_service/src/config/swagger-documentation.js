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
 *           description: All users removed
 *         "500":
 *           description: Internal server error
 */

// Follow definitions

/**
 * @swagger
 * definitions:
 *   Follow:
 *     type: object
 *     required:
 *     - username1
 *     - username2
 *     properties:
 *          username1:
 *              type: string
 *              example: Hugo
 *          username2:
 *              type: string
 *              example: Sepp
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
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Relationship follows between two existing profiles
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Follow'
 *        - in: body
 *          name: body
 *          description: Relationship follows between two existing profiles
 *          required: true
 *          schema:
 *            $ref: '#/definitions/Follow'
 *      responses:
 *        '201':
 *          description: Follow relationship created
 *          schema:
 *             $ref: '#/definitions/Follow'
 *        '500':
 *          description: Internal server error
 */

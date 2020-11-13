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
 *       notification:
 *         type: boolean
 *         default: false
 *         example: false
 */

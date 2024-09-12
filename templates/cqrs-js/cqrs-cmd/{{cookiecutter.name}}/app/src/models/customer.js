/**
 * This block is only required for Swagger 2.0, and should be removed when generating OpenAPI 3.0 file generation
 * 
 * @swagger
 * definitions:
 *   schemas:
 *     Customer:
 *       type: object
 *       description: User object
 *       properties:
 *         id:
 *           type: integer
 *           description: User's id
 *           format: int64
 *           example: 1
 *         firstName:
 *           type: string
 *           description: First name of the user
 *           example: Alice
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *           example: Smith
 *         dateOfBirth:
 *           type: string
 *           description: Date of birth of the user
 *           example: 01-01-2001
 */
 class Customer {

    constructor (json) {
        // Check if fields exist and ensure firstName, lastName, dateOfBirth are not null
        if (
            'id' in json && 
            json.firstName && 
            json.lastName && 
            json.dateOfBirth) {
                Object.assign(this, json);
        } else {
            throw new Error('Missing customer fields');
        }
    }
}

module.exports = Customer;

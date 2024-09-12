/**
===========================================================================
This sample code is created by the Architecture as Code team at TELUS.
The main purpose of this code is to give developers at TELUS a reference
and starting point for their projects.
As a TELUS Developer, you may update your copy of this code per your needs.
===========================================================================
Last updated: 04-26-2024
Description: Object class demonstrating Swagger OpenAPI ApiModel annotation and
example values
===========================================================================
*/

/**
 * This block is only for Swagger 2.0 file generation
/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     description: User object
 *     properties:
 *       userId:
 *         type: integer
 *         description: User's id
 *         format: int64
 *         example: 1
 *       firstName:
 *         type: string
 *         description: First name of the user
 *         example: Alice
 *       lastName:
 *         type: string
 *         description: Last name of the user
 *         example: Smith
 */
class User {
  userId: number;
  firstName: string;
  lastName: string;

  constructor(userId: number, firstName: string, lastName: string) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export default User;

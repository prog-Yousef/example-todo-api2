const { db } = require('../../services/db');
const { sendResponse, sendError } = require("../../responses/index");

exports.handler = async (event, context) => {
    const { insultId } = event.pathParameters;
    const { insult } = JSON.parse(event.body);

    try {
        await db.update({
            TableName: 'insults-db',
            Key: { id: insultId },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'set insult = :insult',
            ExpressionAttributeValues: {
            ':insult': insult
            }

        }).promise();
        
        return sendResponse(200, { success: true } );
    } catch (error) {
        return sendError(500, { success: false, message: 'Could not update insult' })
    }
}
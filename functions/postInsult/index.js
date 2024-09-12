const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/db');
const { nanoid } = require('nanoid');


exports.handler = async (event, context) => {
    const { insult, play } = JSON.parse(event.body);

    try {
        const id = nanoid();

        await db.put({
            TableName: 'insults-db',
            Item: {
                id: id,
                insult: insult,
                play: play
            }
        }).promise();

        return sendResponse(200, { success: true } );
    } catch (error) {
        return sendError(500, { success: false, message: 'Could not add insult' })
    }
}
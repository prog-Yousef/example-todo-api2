const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/db');

const insults = [
    {
        insult: "Never hung poison on a fouler toad",
        play: "Rickard III"
    },
    {
        insult: "He thinks too much: such men are dangerous. ",
        play: "Julius Ceasar"
    }
];

exports.handler = async (event, context) => {
    try {
        const { Items } = await db.scan({
            TableName: 'insults-db',
            FilterExpression: "attribute_exists(#DYNOBASE_insult)",
            ExpressionAttributeNames: {
                "#DYNOBASE_insult": "insult"
            }
        }).promise();

        return sendResponse(200, { success: true, insults: Items });
    } catch (error) {
        return sendError(500, { success: false, message: 'Could not get insults' })
    }
};
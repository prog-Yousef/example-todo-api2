const {sendResponse, sendError} = require("../../responses/index");
const {db} = require("../../services/db");


exports.handler = async (event, context) => { 
    const {insultId} = event.pathParameters;
    try {
        await db.delete({
            TableName:'insults-db',
            key:{
                'id':insultId
            }
            }).promise();
            return sendResponse(200, {success: true});
    } catch (error) {
        return sendError(500, {success:false,message:'could not delete insult'});
    }
}
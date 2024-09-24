const { keys } = require( "../data/keys" ) ;
const {sendError} = require('../responses/index');



 const apiKeyValidatior = {
    before: async (request) => { 

        const apiKey = request.eventheaders['todo-api-key'];

        if(!apiKey) return sendError(400, 'API-key not found  in header');

        const valid = keys.find((key) => key === apiKey);

        if(!valid) return sendError (400, 'API-key not valid')
    },
    
    
}
module.exports = {apiKeyValidatior};
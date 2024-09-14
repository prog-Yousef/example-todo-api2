const { sendResponse } = require("../../responses/index");
const { db } = require("../../services/db");

module.exports.handler = async (event) => {

  const {username} = event.pathParameters;
  console.log(username);
  console.log(event.pathParameters);


  try {
    const { Items } = await db.query({
      TableName: " new-example-todos",
      IndexName: "usernameIndex",
      KeyConditionExpression:"username = :username", 
      ExpressionAttributeValues: {
        ":username": username,
      },



    });

    return sendResponse(Items);
  } catch (error) {}
};
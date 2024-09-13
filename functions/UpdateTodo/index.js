const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const body = JSON.parse(event.body);

  try {
    await db.update({
      TableName: "example-todos3",
      Key: {
        todoId: id,
      },
      UpdateExpression: "SET done = :done",
      ExpressionAttributeValues: {
        ":done": body.done,
      },
    });
  } catch (error) {}

  return sendResponse({ message: "Todo updated" });
};
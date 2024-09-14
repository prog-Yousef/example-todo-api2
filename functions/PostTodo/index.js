const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { v4: uuidv4 } = require("uuid");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  try {
    await db.put({
      TableName: "new-example-todos",
      Item: {
        username: body.username,
        todoId: uuidv4(),
        todo: body.todo,
        done: false,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return sendError(400, "Could not create todo");
  }

  return sendResponse({ message: "Todo created!" });
};
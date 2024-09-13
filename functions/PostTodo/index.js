const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { v4: uuidv4 } = require("uuid");

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  try {
    await db.put({
      TableName: "example-todos3",
      Item: {
        todoId: uuidv4(),
        todo: body.todo,
        done: false,
      },
    });
  } catch (error) {
    return sendError(400, "Could not create todo");
  }

  return sendResponse({ message: "Todo created!" });
};
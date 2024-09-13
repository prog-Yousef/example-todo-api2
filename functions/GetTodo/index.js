const { sendResponse } = require("../../responses/index");
const { db } = require("../../services/db");

module.exports.handler = async (event) => {
  try {
    const { Items } = await db.scan({
      TableName: "example-todos3",
    });

    return sendResponse(Items);
  } catch (error) {}
};
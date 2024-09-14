const { sendResponse } = require("../../responses/index");
const { db } = require("../../services/db");

module.exports.handler = async (event) => {
  const { username, from, to } = JSON.parse(event.body);

  console.log(from, to);

  try {
    const { Items } = await db.query({
      TableName: "new-example-todos",
      IndexName: "timestampIndex",
      KeyConditionExpression:
        "username = :username AND #ColumnTimestamp BETWEEN :from AND :to",
      ExpressionAttributeNames: {
        "#ColumnTimestamp": "timestamp",
      },
      ExpressionAttributeValues: {
        ":username": username,
        ":from": from,
        ":to": to,
      },
    });

    console.log(Items);

    return sendResponse(Items);
  } catch (error) {
    console.log(error);
  }
};
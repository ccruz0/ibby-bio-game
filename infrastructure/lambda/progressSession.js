// GET /progress/session?player_id=... — fetch full progress for cross-device resume.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

export async function handler(event) {
  const player_id = event.queryStringParameters?.player_id;
  if (!player_id) {
    return { statusCode: 400, body: JSON.stringify({ error: "missing player_id" }) };
  }

  const existing = await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: { player_id } }));
  if (!existing.Item) {
    return { statusCode: 404, body: JSON.stringify({ error: "unknown player_id" }) };
  }

  return { statusCode: 200, body: JSON.stringify(existing.Item) };
}

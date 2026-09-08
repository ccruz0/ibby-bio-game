// POST /progress/init — create a fresh player_progress row for a new anonymous
// Cognito identity, or return the existing one if the client already has a player_id.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

const emptyBattle = () => ({ status: "incomplete", score: 0, attempts: 0, timestamp: "" });

export async function handler(event) {
  const body = event.body ? JSON.parse(event.body) : {};
  const player_id = body.player_id ?? randomUUID();

  const existing = await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: { player_id } }));
  if (existing.Item) {
    return { statusCode: 200, body: JSON.stringify(existing.Item) };
  }

  const progress = {
    player_id,
    episode: "water-a1.1",
    battles: { battle_1: emptyBattle(), battle_2: emptyBattle(), battle_3: emptyBattle() },
    episode_status: "in_progress",
    overall_score: 0,
  };

  await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: progress }));
  return { statusCode: 200, body: JSON.stringify(progress) };
}

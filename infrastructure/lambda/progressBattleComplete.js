// POST /progress/battle-complete — record a battle result. Score is stored as
// the player's best attempt (retries never lower a saved score).
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;
const VALID_BATTLE_IDS = new Set(["battle_1", "battle_2", "battle_3"]);

export async function handler(event) {
  const { player_id, battle_id, score, attempts } = JSON.parse(event.body ?? "{}");

  if (!player_id || !VALID_BATTLE_IDS.has(battle_id)) {
    return { statusCode: 400, body: JSON.stringify({ error: "missing player_id or invalid battle_id" }) };
  }

  const existing = await ddb.send(new GetCommand({ TableName: TABLE_NAME, Key: { player_id } }));
  if (!existing.Item) {
    return { statusCode: 404, body: JSON.stringify({ error: "unknown player_id — call /progress/init first" }) };
  }

  const progress = existing.Item;
  const prevScore = progress.battles[battle_id]?.score ?? 0;
  progress.battles[battle_id] = {
    status: score >= 70 ? "complete" : "incomplete",
    score: Math.max(score, prevScore),
    attempts,
    timestamp: new Date().toISOString(),
  };

  const scores = Object.values(progress.battles).map((b) => b.score);
  progress.overall_score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  progress.episode_status = Object.values(progress.battles).every((b) => b.status === "complete")
    ? "complete"
    : "in_progress";

  await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: progress }));
  return { statusCode: 200, body: JSON.stringify(progress) };
}

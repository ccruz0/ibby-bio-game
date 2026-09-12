import { getPlayer } from "../player/player";
import { averageScore, countFinished, readScoreboard } from "../player/scoreboard";

/**
 * The full score card: every episode, how far the player got and what she
 * scored. Shown on the notebook home and after finishing an episode.
 *
 * Device-only for now: one player, nothing sent anywhere. When a hall of fame
 * across players arrives, this is the component that grows a second column.
 */
export default function Scoreboard({ highlightEpisodeId }: { highlightEpisodeId?: string }) {
  const player = getPlayer();
  const scores = readScoreboard();
  const finished = countFinished(scores);
  const average = averageScore(scores);
  const anyStarted = scores.some((s) => s.started);

  return (
    <section className="ibby-scorecard" aria-labelledby="scorecard-title">
      <h2 className="ibby-scorecard-title" id="scorecard-title">
        {player.name}&apos;s score card
      </h2>

      <div className="ibby-scorecard-totals">
        <span className="ibby-scorecard-total">
          <strong>{finished}</strong> of <strong>{scores.length}</strong> mysteries solved
        </span>
        <span className="ibby-scorecard-total">
          Average score <strong>{average}%</strong>
        </span>
      </div>

      {!anyStarted && <p className="ibby-scorecard-empty">Nothing solved yet — pick an episode and the card fills in.</p>}

      <table className="ibby-scorecard-table">
        <caption className="ibby-scorecard-caption">Progress per episode, saved on this device</caption>
        <thead>
          <tr>
            <th scope="col">Episode</th>
            <th scope="col">Evidence</th>
            <th scope="col">Score</th>
            <th scope="col">State</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s) => (
            <tr key={s.id} className={s.id === highlightEpisodeId ? "is-current" : undefined}>
              <th scope="row">{s.title}</th>
              <td>
                {s.completedBattles} / {s.totalBattles}
              </td>
              <td>{s.started ? `${s.score}%` : "—"}</td>
              <td>{s.finished ? "Solved ✓" : s.started ? "In progress" : "Not started"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

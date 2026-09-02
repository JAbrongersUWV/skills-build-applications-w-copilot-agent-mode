import { useEffect, useState } from 'react'
import { apiBaseUrl, displayName, fetchCollection } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${apiBaseUrl}/api/leaderboard/`

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection(leaderboardEndpoint)
      .then((records) => { setLeaders(records); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><span className="eyebrow">Community pulse</span><h1>Leaderboard</h1></div><span className="count-badge">Top performers</span></div>
      {status === 'loading' && <p className="feedback">Loading leaderboard...</p>}
      {status === 'error' && <p className="feedback error">Could not load leaderboard.</p>}
      {status === 'ready' && leaders.length === 0 && <p className="feedback">No rankings available yet.</p>}
      {status === 'ready' && leaders.length > 0 && <div className="leader-list">{leaders.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999)).map((leader, index) => (
        <article className="leader-row" key={leader._id ?? leader.userId}>
          <strong className="rank">{leader.rank ?? index + 1}</strong><div className="avatar">{displayName(leader.userId).charAt(0)}</div><div className="leader-name"><strong>{displayName(leader.userId)}</strong><span>Consistency champion</span></div><strong className="score">{leader.score.toLocaleString()} pts</strong>
        </article>
      ))}</div>}
    </section>
  )
}

export default Leaderboard
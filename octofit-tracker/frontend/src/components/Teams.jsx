import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => { fetchCollection('teams').then((records) => { setTeams(records); setStatus('ready') }).catch(() => setStatus('error')) }, [])

  return (
    <section className="page-section"><div className="section-heading"><div><span className="eyebrow">Train together</span><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div>
      {status === 'loading' && <p className="feedback">Loading teams...</p>}{status === 'error' && <p className="feedback error">Could not load teams.</p>}{status === 'ready' && teams.length === 0 && <p className="feedback">No teams created yet.</p>}
      {status === 'ready' && teams.length > 0 && <div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id ?? team.name}><span className="card-index">Team {String(team._id ?? '').slice(-2) || '01'}</span><h2>{team.name}</h2><p>{team.members?.length ?? 0} active members</p><div className="member-dots">{team.members?.slice(0, 5).map((member, index) => <span key={member?._id ?? member ?? index}>{String(member?.username ?? member ?? '?').charAt(0)}</span>)}</div></article>)}</div>}
    </section>
  )
}

export default Teams
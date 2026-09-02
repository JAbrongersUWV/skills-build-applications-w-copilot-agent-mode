import { useEffect, useState } from 'react'
import { apiBaseUrl, displayName, fetchCollection } from '../api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : `${apiBaseUrl}/api/users/`

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => { fetchCollection(usersEndpoint).then((records) => { setUsers(records); setStatus('ready') }).catch(() => setStatus('error')) }, [])

  return (
    <section className="page-section"><div className="section-heading"><div><span className="eyebrow">Your training circle</span><h1>Users</h1></div><span className="count-badge">{users.length} athletes</span></div>
      {status === 'loading' && <p className="feedback">Loading athletes...</p>}{status === 'error' && <p className="feedback error">Could not load athletes.</p>}{status === 'ready' && users.length === 0 && <p className="feedback">No athletes found.</p>}
      {status === 'ready' && users.length > 0 && <div className="card-grid">{users.map((user) => <article className="info-card user-card" key={user._id ?? user.email}><div className="avatar large">{displayName(user).charAt(0)}</div><h2>{displayName(user)}</h2><p>{user.email}</p><span className="goal-label">{user.profile?.goal ?? 'Ready to move'}</span></article>)}</div>}
    </section>
  )
}

export default Users
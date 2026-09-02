import { useEffect, useState } from 'react'
import { apiBaseUrl, displayName, fetchCollection } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : `${apiBaseUrl}/api/activities/`

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection(activitiesEndpoint)
      .then((records) => {
        setActivities(records)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Movement log</span>
          <h1>Activities</h1>
        </div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      {status === 'loading' && <p className="feedback">Loading activities...</p>}
      {status === 'error' && <p className="feedback error">Could not load activities.</p>}
      {status === 'ready' && activities.length === 0 && <p className="feedback">No activities logged yet.</p>}
      {status === 'ready' && activities.length > 0 && (
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Athlete</th><th>Type</th><th>Value</th><th>Recorded</th></tr></thead>
            <tbody>{activities.map((activity) => (
              <tr key={activity._id ?? `${activity.userId}-${activity.recordedAt}`}>
                <td>{displayName(activity.userId)}</td>
                <td><span className="type-pill">{activity.type}</span></td>
                <td>{activity.value}</td>
                <td>{activity.recordedAt ? new Date(activity.recordedAt).toLocaleDateString() : 'Recently'}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${apiBaseUrl}/api/workouts/`

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => { fetchCollection(workoutsEndpoint).then((records) => { setWorkouts(records); setStatus('ready') }).catch(() => setStatus('error')) }, [])

  return (
    <section className="page-section"><div className="section-heading"><div><span className="eyebrow">Personal library</span><h1>Workouts</h1></div><span className="count-badge">{workouts.length} sessions</span></div>
      {status === 'loading' && <p className="feedback">Loading workouts...</p>}{status === 'error' && <p className="feedback error">Could not load workouts.</p>}{status === 'ready' && workouts.length === 0 && <p className="feedback">No workouts available.</p>}
      {status === 'ready' && workouts.length > 0 && <div className="card-grid">{workouts.map((workout) => <article className="info-card workout-card" key={workout._id ?? workout.name}><div className="workout-top"><span className="difficulty">{workout.difficulty ?? 'beginner'}</span><span>{workout.exercises?.length ?? 0} moves</span></div><h2>{workout.name}</h2><p>{workout.description}</p></article>)}</div>}
    </section>
  )
}

export default Workouts
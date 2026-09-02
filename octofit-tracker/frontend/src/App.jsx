import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar"><NavLink className="brand" to="/"><span className="brand-mark">O</span><span>Octofit <em>Tracker</em></span></NavLink><span className="status-dot">Live data</span></header>
      <div className="app-layout"><aside className="sidebar"><span className="eyebrow">Workspace</span><nav className="nav-list"><NavLink to="/" end>Overview</NavLink><NavLink to="/activities">Activities</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/users">Users</NavLink><NavLink to="/workouts">Workouts</NavLink></nav></aside><main><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main></div>
    </div>
  )
}

function Overview() {
  return <section className="page-section overview"><span className="eyebrow">Wednesday, September 2</span><h1>Make today count.</h1><p className="intro">A clear view of your team's momentum, one session at a time.</p><div className="overview-grid"><NavLink className="overview-card dark" to="/activities"><span>01 / Move</span><strong>Log your latest activity</strong><span className="arrow">-&gt;</span></NavLink><NavLink className="overview-card coral" to="/leaderboard"><span>02 / Compete</span><strong>See who's leading the pack</strong><span className="arrow">-&gt;</span></NavLink><NavLink className="overview-card yellow" to="/workouts"><span>03 / Train</span><strong>Choose a focused workout</strong><span className="arrow">-&gt;</span></NavLink></div></section>
}

export default App

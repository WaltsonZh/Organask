import { useOutletContext } from 'react-router-dom'

export default function Dashboard() {
  const { user, tasks } = useOutletContext()

  return (
    <div className='Dashboard Page'>
      <div className='title'>
        <h1>Dashboard</h1>
        <h1>Welcome, {user.displayName} !</h1>
      </div>
      <div>
        <h2 className='subtitle'>Today's Tasks</h2>
      </div>
      <div>
        <h2 className='subtitle'>Recent Tasks</h2>
      </div>
    </div>
  )
}

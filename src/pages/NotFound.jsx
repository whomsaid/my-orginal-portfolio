import { Link } from 'react-router-dom'
import BackgroundFX from '../components/site/BackgroundFX.jsx'

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center">
      <BackgroundFX />
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="text-gradient mt-4 font-display text-6xl font-bold">Lost signal</h1>
        <p className="mt-4 text-muted">This page does not exist.</p>
        <Link to="/" className="btn-primary mt-8 inline-flex rounded-xl px-6 py-3 text-sm font-semibold">Back to the portfolio</Link>
      </div>
    </main>
  )
}

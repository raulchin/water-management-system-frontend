import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from './providers/AppProviders'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50">
          <AppRouter />
        </div>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App

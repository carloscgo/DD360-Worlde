import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './infrastructure/ui/components/ErrorBoundary'
import Layout from './infrastructure/ui/components/Layout'
import { BrowserRouter } from './infrastructure/ui/utils/routes'

import { initDB, configDB } from './application';

import './index.css'

initDB(configDB);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <HelmetProvider>
          <Layout data-testid="layout-component" />
        </HelmetProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App

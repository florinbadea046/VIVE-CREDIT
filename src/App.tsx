import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ScoringPage } from './modules/scoring/pages/ScoringPage';

function App() {
  const location = useLocation();

  const showHeader = location.pathname === '/';

  return (
    <div>
      {showHeader && <header>Welcome to the Home Page</header>}
      <AppRoutes />
      <ScoringPage />
    </div>
  );
}
export default App;

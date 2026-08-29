import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import PracticePage from '@/pages/PracticePage';
import SessionPage from '@/pages/SessionPage';
import ResultsPage from '@/pages/ResultsPage';
import ProgressPage from '@/pages/ProgressPage';
import QuestionBankPage from '@/pages/QuestionBankPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* App */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/questions" element={<QuestionBankPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
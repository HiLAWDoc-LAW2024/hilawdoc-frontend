import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import RegisterAccountPage from './pages/RegisterAccount'
import CreateAppointmentSlotPage from './pages/CreateAppointmentSlot'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterAccountPage />} />
        <Route path="/appointment/create" element={<CreateAppointmentSlotPage />} />
      </Routes>
    </Router>
  );
}

export default App

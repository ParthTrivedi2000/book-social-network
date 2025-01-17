import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/Register/Register';
import ActivateAccount from './components/ActivateAccount/ActivateAccount';
import BookModule from './modules/book/BookModule';
import AuthGuard from './app/services/guard/AuthGuard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate-account/" element={<ActivateAccount />} />
        <Route
          path="/books/*"
          element={
            <AuthGuard>
              <BookModule />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;


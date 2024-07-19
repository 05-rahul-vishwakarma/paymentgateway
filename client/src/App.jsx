import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './pages/root/RootLayout';
import Home from './pages/root/Home';
import AuthLayout from './pages/auth/AuthLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import axios from 'axios';

function App() {

  axios.defaults.baseURL = "http://localhost:3500";
  axios.defaults.withCredentials = true;


  return (
    <Router>
      <Routes>
        <Route path='/auth' element={<AuthLayout />}  >
          <Route path='sign-up' element={<SignUp />} />
          <Route path='sign-in' element={<SignIn />} />
        </Route>
        <Route path='/' element={<RootLayout />} >
          <Route path='home' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

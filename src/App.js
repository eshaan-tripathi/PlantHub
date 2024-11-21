import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PagenotFound from './pages/Pagenotfound';
import About from './pages/About';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/dashboard';
import PrivateRoute from './components/Routes/privateroute';
import ForgotPassword from './pages/Auth/ForgotPassword';

function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path = "/dashboard" element= {<PrivateRoute/>}>
                   <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/*" element={<PagenotFound />} />
            </Routes>
        </>
    );
}

export default App;

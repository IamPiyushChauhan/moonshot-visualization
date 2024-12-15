import './App.css';
import React,{useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DashBord from './pages/DashBordPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { loginCookiesKey } from './constant';
import { getCookie } from './utils/cookiesUtils';


export const LoginContext = React.createContext();

function App() {
  const [isLogIn, setIsLogIn] = useState(false);
  useEffect(()=>{
    const loginCookies = getCookie(loginCookiesKey);
    if(loginCookies){
      setIsLogIn(true);
    }
  },[])
  return (
    <div className="App">
      <ToastContainer />
      <LoginContext.Provider value={{ isLogIn: isLogIn, setIsLogIn: setIsLogIn }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate replace to="/login" />} />
            <Route path='/' element={<MainPage />}>
              <Route path='login' element={<LoginPage isLogIn={isLogIn} />} />
              <Route path='signin' element={<SignupPage />} />
              <Route path='dashbord' element={<DashBord />} >
                
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>

    </div>
  );
}

export default App;

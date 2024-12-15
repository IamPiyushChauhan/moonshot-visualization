import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { LoginContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../utils/cookiesUtils'
import { loginCookiesKey } from '../constant'

function LoginPage() {
  const navigate = useNavigate()
  const [useremail, setUseremail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [errorInLogIn, setErrorInLogIn] = useState(false)
  const [passwordView, setPasswordView] = useState(false)

  const loginContext = useContext(LoginContext)

  useEffect(() => {
    if (loginContext.isLogIn) {
      loginContext.setIsLogIn(false)
    }
  }, [])

  const vaidateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(useremail)

    if (isValidEmail) {
      setEmailError('')
    } else {
      setEmailError('Enter Valid Email')
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    const isValidPassword = passwordRegex.test(password)

    if (isValidPassword) {
      setPasswordError('')
    } else {
      setPasswordError(
        'Enter Passsword of atlest 8 character and one capital letter must, one small letter must, numbers are allowed and one special char must',
      )
    }
    return isValidEmail && isValidPassword
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (vaidateForm()) {
      axios
        .post(
          'https://moonshot-visualization-backend.onrender.com/auth/login',
          {
            useremail,
            password,
          },
        )
        .then((response) => {
          const token = response.data.dataToken
          setCookie(loginCookiesKey, token, 30)
          loginContext.setIsLogIn(true)
          navigate('/dashbord')
        })
        .catch((e) => {
          setErrorInLogIn('Invalid Login')
          console.log(e)
        })
      loginContext.setIsLogIn(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <h2>Login</h2>
          <div className="input-container">
            {emailError.length > 0 ? (
              <label style={{ color: 'var(--error-color)', fontSize: '0.5em' }}>
                {emailError}
              </label>
            ) : (
              <></>
            )}
            <div className="input-box">
              <img
                src="email.png"
                alt="Email Icon"
                style={{ width: '20px', height: '20px', marginRight: '5px' }}
              />
              <input
                type="email"
                value={useremail}
                placeholder="Enter Email"
                onChange={(e) => setUseremail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-container">
            {passwordError.length > 0 ? (
              <label style={{ color: 'var(--error-color)', fontSize: '0.5em' }}>
                {passwordError}
              </label>
            ) : (
              <></>
            )}
            <div className="input-box">
              <div
                onClick={() => {
                  setPasswordView(!passwordView)
                }}
              >
                <img
                  src={passwordView ? 'eye.png' : 'hidden.png'}
                  alt={passwordView ? 'Hide Icon' : 'Eye Icon'}
                  style={{ width: '20px', height: '20px', marginRight: '5px' }}
                />
              </div>
              <input
                type={passwordView ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </div>
        <div style={{ color: 'var(--error-color)' }}>
          {errorInLogIn ? 'Error In Login' : ''}
        </div>
      </form>
    </div>
  )
}

export default LoginPage

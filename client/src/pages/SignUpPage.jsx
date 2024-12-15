import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordView, setPasswordView] = useState(false)
  const [passwordView2, setPasswordView2] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordError2, setPasswordError2] = useState('')
  const [errorInLogIn, setErrorInLogIn] = useState(false)

  const vaidateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(email)

    if (isValidEmail) {
      setEmailError('')
    } else {
      setEmailError('Enter Valid Email')
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    const isValidPassword = passwordRegex.test(password)
    const isValidPassword2 = passwordRegex.test(confirmPassword)

    if (isValidPassword) {
      setPasswordError('')
    } else {
      setPasswordError(
        'Enter Passsword of atlest 8 character and one capital letter must, one small letter must, numbers are allowed and one special char must',
      )
    }
    if (isValidPassword2) {
      setPasswordError2('')
    } else {
      setPasswordError2(
        'Enter Passsword of atlest 8 character and one capital letter must, one small letter must, numbers are allowed and one special char must',
      )
    }
    return isValidEmail && isValidPassword && isValidPassword2
  }

  const handleSignup = async (e) => {
    if (vaidateForm()) {
      if (password !== confirmPassword) {
        alert("Passwords don't match")
        return
      }

      axios
        .post(
          'https://moonshot-visualization-backend.onrender.com/auth/signup',
          {
            useremail: email,
            password: password,
          },
        )
        .then((response) => {
          navigate('/')
        })
        .catch((error) => {
          console.error('Error signing up:', error)
          setErrorInLogIn(true)
        })
    }
    e.preventDefault()
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '65vh',
      }}
    >
      <form onSubmit={handleSignup}>
        <div className="login-container">
          <h2>SignUp</h2>
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
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
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

          <div className="input-box" style={{ marginBottom: '10px' }}>
            {passwordError2.length > 0 ? (
              <label style={{ color: 'var(--error-color)', fontSize: '0.5em' }}>
                {passwordError2}
              </label>
            ) : (
              <></>
            )}
            <div
              onClick={() => {
                setPasswordView2(!passwordView2)
              }}
            >
              <img
                src={passwordView2 ? 'eye.png' : 'hidden.png'}
                alt={passwordView2 ? 'Hide Icon' : 'Eye Icon'}
                style={{ width: '20px', height: '20px', marginRight: '5px' }}
              />
            </div>
            <input
              type={passwordView2 ? 'text' : 'password'}
              placeholder="Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">SignUp</button>
        </div>
        <div style={{ color: 'var(--error-color)' }}>
          {errorInLogIn ? 'Error In Login' : ''}
        </div>
      </form>
    </div>
  )
}

export default SignupPage

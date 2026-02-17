import React, { useState } from 'react'
import useAuthStore from '../store/useAuthStore.js'
import { useNavigate, Link } from "react-router-dom";
import ErrorToast from '../components/ErrorToast.jsx';


export default function Login() {
  const LoginAction = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const result = await LoginAction({ email, password })
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }

  }

  return (
    <div className='container  max-w-4xl min-h-screen m-auto flex items-center justify-center'>

      <div className='card p-5 flex flex-col gap-5 items-center justify-center bg-base-200 w-96 shadow-sm'>
        <h2 className='card-title text-center'>Вхід</h2>
        <div className='card-actions flex items-center justify-center'>
          <input className='input w-full'
            type="email"
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <input
            className='input w-full'
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='btn max-wbtn btn-primary btn-block' onClick={onSubmit}>Увійти</button>
        <div className="text-center">
          <Link
            to="/register"
            className="link link-hover text-sm opacity-70"
          >
            Ще не маєте акаунта? Реєстрація
          </Link>
        </div>


        {error && (
          <ErrorToast error={error} onClose={() => setError(null)} />
        )}
      </div>

    </div>
  )
}

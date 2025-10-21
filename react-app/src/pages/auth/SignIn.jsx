import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Note: This will need to be replaced with a custom auth solution
// since we're removing NextAuth
const SignIn = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already authenticated
    // This logic will need to be updated when implementing custom auth
    const token = localStorage.getItem('authToken')
    if (token) {
      navigate('/')
    }
  }, [navigate])

  const handleSignIn = () => {
    // Placeholder for custom sign-in logic
    // This will need to be implemented with your auth solution
    console.log('Sign in functionality needs to be implemented')
  }

  return (
    <>
      <Helmet>
        <title>Вхід - Живий світ</title>
        <meta name='description' content='Увійти в акаунт Живий світ' />
      </Helmet>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Вхід</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    onClick={handleSignIn}
                  >
                    Увійти
                  </button>
                </form>
                <div className="text-center mt-3">
                  <p>
                    Немає акаунту? 
                    <button 
                      className="btn btn-link p-0 ms-1"
                      onClick={() => {/* Open sign up modal */}}
                    >
                      Зареєструватися
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn

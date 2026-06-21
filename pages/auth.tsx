import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../components/AuthProvider'

export default function AuthPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const url = isSignup ? '/api/auth/signup' : '/api/auth/login'
    const body = isSignup ? { email, password, name } : { email, password }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || 'Something went wrong')
      return
    }

    if (isSignup) {
      setMessage('Account created. Please log in.')
      setIsSignup(false)
      setPassword('')
      return
    }

    signIn(data.token, data.user)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">{isSignup ? 'Sign up' : 'Log in'}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {isSignup ? 'Create an account to bookmark colleges.' : 'Log in to manage your saved colleges.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isSignup && (
              <label className="block text-sm font-medium text-slate-700">
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </label>
            )}

            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>

            <button className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500">
              {isSignup ? 'Create account' : 'Log in'}
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}

          <button
            type="button"
            onClick={() => setIsSignup((value) => !value)}
            className="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}

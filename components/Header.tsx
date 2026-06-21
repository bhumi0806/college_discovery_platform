import Link from 'next/link'
import { useAuth } from './AuthProvider'

export default function Header() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <header className="mb-6 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-xl font-semibold text-slate-900 hover:text-indigo-600">
            College Discovery
          </Link>
          <p className="text-sm text-slate-600">Browse, compare, and bookmark colleges.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
            Browse
          </Link>
          <Link href="/bookmarks" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
            Saved items
          </Link>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              Logout {user?.name ? `(${user.name})` : ''}
            </button>
          ) : (
            <Link href="/auth" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

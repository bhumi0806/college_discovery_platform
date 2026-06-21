import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../components/AuthProvider'
import Header from '../components/Header'

type College = {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  placements: string
}

type Bookmark = {
  id: string
  college: College
}

export default function BookmarksPage() {
  const { token, isAuthenticated } = useAuth()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false)
      return
    }

    setLoading(true)
    fetch('/api/bookmarks', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Unable to load bookmarks')
        }
        return res.json()
      })
      .then((items) => setBookmarks(items))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [isAuthenticated, token])

  const removeBookmark = async (collegeId: string) => {
    if (!token) return
    await fetch('/api/bookmarks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ collegeId })
    })
    setBookmarks((current) => current.filter((item) => item.college.id !== collegeId))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Header />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Saved colleges</h1>
          <p className="mt-2 text-sm text-slate-500">Your bookmarked colleges are stored in your account.</p>

          {!isAuthenticated ? (
            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
              <p className="font-semibold">You need to log in to view bookmarks.</p>
              <Link href="/auth" className="mt-3 inline-block rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300">
                Log in or sign up
              </Link>
            </div>
          ) : loading ? (
            <p className="mt-6 text-sm text-slate-600">Loading saved colleges…</p>
          ) : error ? (
            <p className="mt-6 text-sm text-red-600">{error}</p>
          ) : bookmarks.length === 0 ? (
            <p className="mt-6 text-sm text-slate-600">No saved colleges yet. Bookmark one from the college detail page.</p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/colleges/${bookmark.college.id}`} className="text-lg font-semibold text-slate-900 hover:text-indigo-600">
                        {bookmark.college.name}
                      </Link>
                      <p className="mt-1 text-sm text-slate-600">{bookmark.college.location}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBookmark(bookmark.college.id)}
                      className="rounded-full bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    <div>Fees: ₹{bookmark.college.fees.toLocaleString()}</div>
                    <div>Rating: {bookmark.college.rating.toFixed(1)}</div>
                    <div>Placements: {bookmark.college.placements}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

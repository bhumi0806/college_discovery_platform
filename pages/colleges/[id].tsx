import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../../components/AuthProvider'

type Review = {
  id: string
  author: string
  rating: number
  content: string
}

type College = {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  overview: string
  placements: string
  courses: string[]
  reviews: Review[]
}

export default function CollegePage() {
  const router = useRouter()
  const { id } = router.query
  const { token, isAuthenticated } = useAuth()
  const [college, setCollege] = useState<College | null>(null)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/colleges/${id}`)
      .then((res) => res.json())
      .then(setCollege)
  }, [id])

  const handleBookmark = async () => {
    if (!token || !college) return

    await fetch('/api/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ collegeId: college.id })
    })

    setBookmarked(true)
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <p className="text-center text-lg text-slate-600">Loading college details…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{college.name}</h1>
            <p className="mt-2 text-slate-600">{college.location}</p>
          </div>
          <Link href="/" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
            Back to list
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-3 text-slate-700">{college.overview}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Courses</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {college.courses.map((course) => (
                  <span key={course} className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Placements</h2>
              <p className="mt-3 text-slate-700">{college.placements}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Reviews</h2>
              <div className="mt-4 space-y-4">
                {college.reviews.length === 0 ? (
                  <p className="text-sm text-slate-500">No reviews yet.</p>
                ) : (
                  college.reviews.map((review) => (
                    <div key={review.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{review.author}</p>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-slate-700">{review.rating}/5</span>
                      </div>
                      <p className="mt-3 text-slate-700">{review.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Fees</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">₹{college.fees.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Rating</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{college.rating.toFixed(1)}</p>
            </div>
            <button
              type="button"
              onClick={handleBookmark}
              disabled={!isAuthenticated || bookmarked}
              className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {bookmarked ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span>★</span> Bookmarked
                </span>
              ) : isAuthenticated ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span>☆</span> Bookmark college
                </span>
              ) : (
                'Log in to bookmark'
              )}
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}

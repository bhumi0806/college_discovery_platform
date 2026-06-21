import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'

type College = {
  id: string
  name: string
  location: string
  fees: number
  rating: number
  placements: string
}

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    fetch(`/api/colleges?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then(setColleges)
  }, [query])

  const selectedColleges = useMemo(
    () => colleges.filter((college) => selected.includes(college.id)),
    [colleges, selected]
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Header />
        <div className="mb-6">
          <div>
            <h2 className="text-xl font-semibold">Explore colleges</h2>
            <p className="mt-2 text-slate-600">Search, compare, and bookmark the best colleges.</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">College list</h2>
                <p className="mt-1 text-sm text-slate-500">Search by name or location.</p>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colleges..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
              />
            </div>

            <div className="space-y-4">
              {colleges.length === 0 ? (
                <p className="text-sm text-slate-500">No colleges found.</p>
              ) : (
                colleges.map((college) => (
                  <div key={college.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <Link href={`/colleges/${college.id}`} className="text-lg font-semibold text-slate-900 hover:text-indigo-600">
                          {college.name}
                        </Link>
                        <p className="text-sm text-slate-600">{college.location}</p>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-slate-700">
                        <span className="rounded-full bg-slate-100 px-3 py-1">Fees ₹{college.fees.toLocaleString()}</span>
                        <span className="rounded-full bg-amber-100 px-3 py-1">Rating {college.rating.toFixed(1)}</span>
                      </div>
                    <p className="mt-3 text-sm text-slate-600">Placements: {college.placements}</p>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelected((current) =>
                            current.includes(college.id)
                              ? current.filter((id) => id !== college.id)
                              : current.length < 2
                              ? [...current, college.id]
                              : current
                          )
                        }
                        className={`rounded-2xl px-3 py-2 text-sm font-medium ${selected.includes(college.id)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        {selected.includes(college.id) ? 'Selected' : 'Compare'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Compare colleges</h2>
            {selectedColleges.length === 0 ? (
              <p className="text-sm text-slate-500">Select up to 2 colleges from the list to compare their fees, rating, location, and placements.</p>
            ) : (
              <div className="space-y-4">
                {selectedColleges.map((college) => (
                  <div key={college.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-lg font-semibold">{college.name}</div>
                    <div className="mt-2 space-y-2 text-sm text-slate-700">
                      <div>Location: {college.location}</div>
                      <div>Fees: ₹{college.fees.toLocaleString()}</div>
                      <div>Rating: {college.rating.toFixed(1)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

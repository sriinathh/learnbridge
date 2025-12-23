import React, { useEffect, useState } from 'react';
import Navbar from '../../components/common/Navbar.jsx';
import InternshipCard from '../../components/internships/InternshipCard.jsx';
import { fetchInternships } from '../../api/internshipApi.js';

const InternshipHubPage = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: '', mode: 'all' });

  const loadInternships = async () => {
    setLoading(true);
    try {
      const { data } = await fetchInternships({
        q: filters.search || undefined,
        mode: filters.mode === 'all' ? undefined : filters.mode,
      });
      setInternships(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInternships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitFilters = (e) => {
    e.preventDefault();
    loadInternships();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-10 space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-bold">Internship &amp; Placement Hub</h1>
            <p className="text-xs text-slate-400">
              Discover AI-matched opportunities based on your skills, interests, and resume.
            </p>
          </div>
          <form onSubmit={submitFilters} className="flex flex-wrap items-center gap-2 text-xs">
            <input
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by role, company, skill..."
              className="w-52 rounded-md bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-1 ring-slate-700 focus:ring-indigo-500"
            />
            <select
              value={filters.mode}
              onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
              className="rounded-md bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-1 ring-slate-700 focus:ring-indigo-500"
            >
              <option value="all">All modes</option>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-400"
            >
              Filter
            </button>
          </form>
        </div>

        {loading && <p className="text-xs text-slate-400">Loading internships...</p>}

        <div className="grid gap-4 md:grid-cols-2">
          {internships.map((i) => (
            <InternshipCard key={i._id} internship={i} />
          ))}
        </div>

        {!loading && !internships.length && (
          <p className="text-xs text-slate-500">No internships found for current filters.</p>
        )}
      </div>
    </div>
  );
};

export default InternshipHubPage;
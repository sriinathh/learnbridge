import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar.jsx';
import { fetchInternship, applyInternship } from '../../api/internshipApi.js';

const InternshipDetailPage = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await fetchInternship(id);
      setInternship(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const apply = async () => {
    setApplying(true);
    try {
      await applyInternship(id, { note: message || undefined });
      alert('Applied successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading && !internship) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 pt-24 pb-10 text-xs">Loading...</div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 pt-24 pb-10 text-xs">Internship not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-10 space-y-5 text-xs">
        <header className="space-y-1">
          <h1 className="text-lg font-bold text-slate-50">{internship.title}</h1>
          <p className="text-slate-300">{internship.company}</p>
          <p className="text-slate-400">
            {internship.location || 'Location N/A'} · {internship.mode || 'remote'} ·{' '}
            Stipend: {internship.stipend || 'N/A'}
          </p>
          {internship.matchScore != null && (
            <p className="text-[11px] text-emerald-300">
              AI Match Score: {internship.matchScore}% – based on your skills and resume
            </p>
          )}
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="mb-1 text-[11px] font-semibold text-slate-200">Description</h2>
          <p className="text-[11px] text-slate-200 whitespace-pre-line">
            {internship.description}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="mb-1 text-[11px] font-semibold text-slate-200">Required Skills</h2>
          <div className="flex flex-wrap gap-1">
            {internship.skills?.map((s) => (
              <span
                key={s}
                className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] text-sky-200 border border-sky-500/25"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
          <h2 className="text-[11px] font-semibold text-slate-200">Apply</h2>
          <p className="text-[11px] text-slate-400">
            You can optionally leave a short note for the recruiter. Your latest resume from the
            Resume Analyzer will be attached automatically (once wired on backend).
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Short note to recruiter (optional)..."
            className="w-full rounded-md bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-1 ring-slate-700 focus:ring-indigo-500"
          />
          <button
            onClick={apply}
            disabled={applying}
            className="rounded-md bg-emerald-500 px-4 py-2 text-[11px] font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
          >
            {applying ? 'Applying...' : 'Apply Now'}
          </button>
        </section>
      </div>
    </div>
  );
};

export default InternshipDetailPage;
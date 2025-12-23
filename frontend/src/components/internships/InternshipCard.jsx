import React from 'react';
import { Link } from 'react-router-dom';

const matchColor = (match) =>
  match >= 90 ? 'text-emerald-300' : match >= 75 ? 'text-amber-300' : 'text-slate-300';

const InternshipCard = ({ internship }) => {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-200">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-50">{internship.title}</h3>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
          {internship.mode || 'remote'}
        </span>
      </div>
      <p className="text-[11px] text-slate-400 mb-1">{internship.company}</p>
      <p className="mb-2 line-clamp-2 text-[11px] text-slate-300">
        {internship.description}
      </p>
      <div className="mb-2 flex flex-wrap gap-1">
        {internship.skills?.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] text-sky-200 border border-sky-500/25"
          >
            {s}
          </span>
        ))}
        {internship.skills?.length > 4 && (
          <span className="text-[10px] text-slate-400">
            +{internship.skills.length - 4} more
          </span>
        )}
      </div>
      <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>Stipend: {internship.stipend || 'N/A'}</span>
        {internship.matchScore != null && (
          <span className={matchColor(internship.matchScore)}>
            AI Match: {internship.matchScore}%
          </span>
        )}
      </div>
      <div className="flex justify-between text-[11px]">
        <Link
          to={`/internships/${internship._id}`}
          className="rounded-full border border-slate-700 px-3 py-1 hover:bg-slate-800"
        >
          View Details
        </Link>
        <button className="rounded-full bg-emerald-500 px-3 py-1 font-semibold text-slate-950 hover:bg-emerald-400">
          Quick Apply
        </button>
      </div>
    </article>
  );
};

export default InternshipCard;
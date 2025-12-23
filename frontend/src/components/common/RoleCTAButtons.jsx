import React from 'react';

const RoleCTAButtons = ({ onStudent, onFaculty, onAdmin }) => (
  <div className="flex flex-wrap gap-3 text-sm">
    <button
      onClick={onStudent}
      className="rounded-full bg-indigo-500 px-4 py-2 font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400"
    >
      Join as Student
    </button>
    <button
      onClick={onFaculty}
      className="rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-800"
    >
      Join as Faculty
    </button>
    <button
      onClick={onAdmin}
      className="rounded-full border border-amber-400/80 bg-amber-500/10 px-4 py-2 font-semibold text-amber-300 hover:bg-amber-400/20"
    >
      Admin Panel
    </button>
  </div>
);

export default RoleCTAButtons;
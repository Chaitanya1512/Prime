import React, { useState } from 'react';
import { TYPE_META } from '../data/items.jsx';

export default function EvidencePanel({ item, onSubmit, onCancel }) {
  const meta = TYPE_META[item.type] || { color: '#4A6580', label: 'Item', icon: null };
  const ev = item.evidence || {};

  const [draftText, setDraftText] = useState(ev.draftText || '');
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [activeStudentIdx, setActiveStudentIdx] = useState(0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const gradingStudents = [
    { name: 'Aarav Sharma', grade: 'A-', rationale: 'Excellent argumentative structure, rich voice. Minor convention errors.', excerpt: 'While the treaty officially ended the war, many historians argue it indirectly contributed to the next conflict by imposing harsh economic reparations on Germany...', status: 'Ready' },
    { name: 'Ishita Gupta', grade: 'A', rationale: 'Superb command of historical ideas and pristine conventions.', excerpt: 'The geopolitical landscape shifted dramatically in 1919, establishing a new order that sought to prevent future global conflicts but ultimately struggled to maintain balance...', status: 'Ready' },
    { name: 'Kabir Singh', grade: 'B+', rationale: 'Good structure, needs deeper analysis of text evidence.', excerpt: 'Many nations believed this peace treaty would last forever. However, under the surface, deep dissatisfaction and economic ruin set a pathway to unrest...', status: 'Ready' },
    { name: 'Meera Patel', grade: 'Flagged', rationale: 'Ambiguous evidence, needs manual review for plagiarism indicator.', excerpt: 'Peace was negotiated in the Hall of Mirrors. However, the mirror reflected not just victory, but the shadows of the next major conflict...', status: 'Review Flag' },
    { name: 'Vihaan Reddy', grade: 'A-', rationale: 'Very strong thesis. Structural flow could be tightened in paragraph three.', excerpt: 'President Wilson’s Fourteen Points aimed to create a serene diplomatic environment, though european powers sought punitive reparations instead...', status: 'Ready' },
    { name: 'Diya Sen', grade: 'B', rationale: 'Descriptive, needs more analytical voice throughout.', excerpt: 'The League of Nations was born from the wreckage of the Great War, aiming to resolve international disputes through dialogue rather than trench warfare...', status: 'Ready' },
    { name: 'Rohan Mehta', grade: 'Flagged', rationale: 'Ambiguous reference citations. Recommended manual audit.', excerpt: 'Europe lay in ruins, and the statesmen gathered at Versailles had the burden of rebuilding a shattered civilization from scratch...', status: 'Review Flag' },
    { name: 'Ananya Rao', grade: 'A', rationale: 'Masterful rhetorical appeal. Captivating voice.', excerpt: 'The terms of the treaty were not merely signatures on parchment; they were the seeds of geopolitical friction that would germinative over two decades...', status: 'Ready' },
    { name: 'Aditya Verma', grade: 'B-', rationale: 'Good ideas, needs revision on syntax and convention rules.', excerpt: 'Most people do not realize that the treaty was a compromise between completely different visions of world peace, led by the Big Three...', status: 'Ready' }
  ];

  const tutorStudents = [
    { name: 'Aarav Sharma', duration: '22m', progress: 'Concept Stuck', summary: 'Struggled with negative integers. Expressed frustration multiple times. Prompted tutor with "I hate algebra" twice.', status: 'Flagged' },
    { name: 'Ishita Gupta', duration: '18m', progress: 'Complete', summary: 'Mastered solving for x with negative variables. Showed fast progress.', status: 'Normal' },
    { name: 'Kabir Singh', duration: '15m', progress: 'Complete', summary: 'Completed all basic challenges. Understood reciprocal isolation.', status: 'Normal' },
    { name: 'Meera Patel', duration: '20m', progress: 'Complete', summary: 'Excellent interaction. Showed strong self-correction capabilities.', status: 'Normal' }
  ];

  const renderContent = () => {
    switch (item.type) {
      case 'grading': {
        const student = gradingStudents[activeStudentIdx];
        return (
          <div className="flex flex-col md:flex-row gap-6 min-h-[420px]">
            <div className="flex-1 md:w-3/5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                  AI Evaluated Submissions
                </h3>
                <span className="text-xs font-semibold text-serene-blue">
                  Student {activeStudentIdx + 1} of {gradingStudents.length}
                </span>
              </div>
              
              <div className="mb-4 flex gap-1.5 overflow-x-auto pb-2 custom-scrollbar">
                {gradingStudents.map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStudentIdx(idx)}
                    className={`flex-shrink-0 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      activeStudentIdx === idx
                        ? 'bg-serene-blue text-white'
                        : st.grade === 'Flagged'
                        ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    {st.name.split(' ')[0]}
                    <span className="ml-1 opacity-70">({st.grade === 'Flagged' ? '⚠️' : st.grade})</span>
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-800">{student.name}</h4>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">Grade 7A English · Literature Essay</p>
                  </div>
                  <div className={`rounded px-2.5 py-1 text-xs font-bold uppercase ${
                    student.grade === 'Flagged'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {student.grade}
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">AI Rationale</h5>
                  <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-100 rounded-lg p-3 shadow-inner">
                    {student.rationale}
                  </p>
                </div>

                <div className="mt-4">
                  <h5 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Essay Excerpt</h5>
                  <p className="font-serif text-sm italic text-slate-500 leading-relaxed bg-white border border-slate-100 rounded-lg p-3 relative shadow-inner">
                    "{student.excerpt}"
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  Rubric Criteria Weights
                </h3>
                <div className="flex flex-col gap-2">
                  {ev.rubric?.map((rub, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-slate-50 bg-slate-50/30 px-4 py-2.5">
                      <span className="text-xs font-semibold text-slate-700">{rub.criteria}</span>
                      <span className="text-xs font-bold text-slate-400">{rub.weight}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-amber-50/50 border border-amber-100/50 p-4">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                    <span>⚠️</span> AI Attention Summary
                  </h4>
                  <p className="mt-1.5 text-xs text-amber-700 leading-relaxed">
                    {ev.detail} The flagged submissions ({ev.flagged?.count} students) require manual confirmation prior to final sync.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <button
                  onClick={() => showToast('Individually reviewing submissions in Gradebook...')}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50"
                >
                  Review Individually in Gradebook
                </button>
                <button
                  onClick={onSubmit}
                  className="w-full cursor-pointer rounded-xl bg-serene-blue py-3.5 text-xs font-bold text-white transition-all hover:bg-serene-blue/90 shadow-md shadow-serene-blue/20"
                >
                  Approve Suggested Grades
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'tutors': {
        const student = tutorStudents[activeStudentIdx];
        return (
          <div className="flex flex-col md:flex-row gap-6 min-h-[420px]">
            <div className="flex-1 md:w-3/5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                  Tutor Session Summaries
                </h3>
                <span className="text-xs font-semibold text-serene-blue">
                  Student {activeStudentIdx + 1} of {tutorStudents.length}
                </span>
              </div>

              <div className="mb-4 flex gap-1.5 overflow-x-auto pb-2 custom-scrollbar">
                {tutorStudents.map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStudentIdx(idx)}
                    className={`flex-shrink-0 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      activeStudentIdx === idx
                        ? 'bg-serene-blue text-white'
                        : st.status === 'Flagged'
                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    {st.name} {st.status === 'Flagged' && '⚠️'}
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-800">{student.name}</h4>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">AI Tutor Session Summary</p>
                  </div>
                  <div className={`rounded px-2.5 py-1 text-xs font-bold uppercase ${
                    student.status === 'Flagged'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {student.progress}
                  </div>
                </div>

                <div className="mt-4 flex gap-6 text-xs text-slate-500">
                  <div>
                    <span className="font-semibold text-slate-400">Duration:</span> {student.duration}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400">Status:</span> {student.progress}
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <h5 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1.5">Conversation Summary</h5>
                  <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-100 rounded-lg p-3 shadow-inner">
                    {student.summary}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  Aggregate Statistics
                </h3>
                <div className="flex flex-col gap-2">
                  {ev.stats?.map((stat, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-slate-50 bg-slate-50/30 px-4 py-2.5">
                      <span className="text-xs font-semibold text-slate-700">{stat.label}</span>
                      <span className="text-xs font-bold text-slate-500">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {ev.flagged && (
                  <div className="mt-6 rounded-xl bg-amber-50/70 border border-amber-100 p-4">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                      <span>⚠️</span> Student Follow-up Flag
                    </h4>
                    <p className="mt-1.5 text-xs text-amber-700 leading-relaxed">
                      <strong>{ev.flagged.student}</strong> was flagged: {ev.flagged.reason}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <button
                  onClick={() => showToast(`Flagged ${ev.flagged.student} for detailed intervention.`)}
                  className="w-full cursor-pointer rounded-xl border border-amber-200 bg-amber-50/20 py-3 text-xs font-bold text-amber-700 transition-all hover:bg-amber-50/50"
                >
                  Flag Student for Intervention
                </button>
                <button
                  onClick={onSubmit}
                  className="w-full cursor-pointer rounded-xl bg-serene-blue py-3.5 text-xs font-bold text-white transition-all hover:bg-serene-blue/90 shadow-md"
                >
                  Acknowledge Summaries
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'reports': {
        return (
          <div className="flex flex-col md:flex-row gap-6 min-h-[420px]">
            <div className="flex-1 md:w-3/5">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                AI Drafted Comment
              </h3>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-800">Zoe Patel</h4>
                    <p className="text-xs font-medium text-slate-400">Grade 5B Science Report</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="cursor-pointer rounded px-3 py-1.5 text-xs font-bold text-serene-blue hover:bg-serene-blue/5 border border-serene-blue/20"
                  >
                    {isEditing ? 'Save Edit' : 'Edit Inline'}
                  </button>
                </div>

                <div className="relative">
                  {isEditing ? (
                    <textarea
                      value={draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                      className="w-full min-h-[160px] rounded-lg border border-slate-200 bg-white p-3 font-sans text-sm text-slate-700 leading-relaxed focus:border-serene-blue focus:outline-none"
                    />
                  ) : (
                    <p className="min-h-[160px] rounded-lg border border-slate-100 bg-white p-4 text-sm text-slate-600 leading-relaxed shadow-inner">
                      {draftText}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  Linked Portfolio Evidence
                </h3>
                <ul className="flex flex-col gap-2">
                  {ev.evidenceLinked?.map((evidence, i) => (
                    <li key={i} className="flex items-start gap-2 rounded-lg border border-slate-50 bg-slate-50/30 px-4 py-2.5 text-xs font-semibold text-slate-600">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-lg bg-slate-50/50 p-4 border border-slate-100">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Draft Profile</span>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Tone Guidance:</span>
                    <span className="font-bold text-serene-blue">{ev.tone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <button
                  onClick={onSubmit}
                  className="w-full cursor-pointer rounded-xl bg-serene-blue py-3.5 text-xs font-bold text-white transition-all hover:bg-serene-blue/90 shadow-md"
                >
                  Approve Comment Draft
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'communication': {
        return (
          <div className="flex flex-col md:flex-row gap-6 min-h-[420px]">
            <div className="flex-1 md:w-3/5">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                Family Form Responses
              </h3>

              <div className="flex flex-col gap-3">
                {ev.responses?.map((res, i) => (
                  <div key={i} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-1.5">
                      <h4 className="text-xs font-bold text-slate-700">{res.parent}</h4>
                      <span className="text-[10px] text-slate-400">Response #{i+1}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/30 p-2.5 rounded-lg border border-slate-50 italic">
                      "{res.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  Context Summary
                </h3>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 mb-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ev.detail} Parents have submitted responses via the Toddle Family portal for coordination.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <button
                  onClick={() => showToast('Syncing volunteer rosters to calendar...')}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50"
                >
                  Roster Volunteers
                </button>
                <button
                  onClick={onSubmit}
                  className="w-full cursor-pointer rounded-xl bg-serene-blue py-3.5 text-xs font-bold text-white transition-all hover:bg-serene-blue/90 shadow-md"
                >
                  Acknowledge & Close
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'planning': {
        return (
          <div className="flex flex-col md:flex-row gap-6 min-h-[420px]">
            <div className="flex-1 md:w-3/5">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                Drafted Lesson Resources
              </h3>

              <div className="flex flex-col gap-3">
                {ev.draftResources?.map((res, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-50 text-xs font-bold text-slate-500 border border-slate-100 select-none">
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  Unit Context
                </h3>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 mb-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ev.detail} Planning is self-paced. These materials remain unpublished draft resources on the course timeline.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <button
                  onClick={onSubmit}
                  className="w-full cursor-pointer rounded-xl bg-serene-blue py-3.5 text-xs font-bold text-white transition-all hover:bg-serene-blue/90 shadow-md"
                >
                  Publish Week 2 Timeline
                </button>
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="fade-in fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-serene-blue/20 backdrop-blur-[4px] transition-opacity duration-300"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-4xl rounded-[28px] border border-black/5 bg-white p-6 sm:p-8 shadow-[0_12px_60px_rgba(0,0,0,0.06)] z-[130]">
        
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white shadow-lg z-[200] animate-bounce">
            {toastMessage}
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-md"
              style={{ backgroundColor: `${meta.color}15`, color: meta.color }}
            >
              {meta.icon}
            </div>
            <span
              style={{ color: meta.color }}
              className="font-sans text-[12px] font-bold tracking-widest uppercase"
            >
              {ev.header || meta.label}
            </span>
          </div>

          <button
            onClick={onCancel}
            className="group flex cursor-pointer items-center gap-1.5 rounded-full bg-slate-50 hover:bg-slate-100 px-3 py-1.5 font-sans text-[10px] font-bold tracking-wide text-slate-500 border border-slate-100 transition-all outline-none"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            BACK
          </button>
        </div>

        <div className="border-t border-slate-50" />

        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

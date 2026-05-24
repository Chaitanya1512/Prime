import React from 'react';

export default function AllClearScreen({ total, onReset }) {
  return (
    <div className="fade-in flex flex-col items-center justify-center px-10 text-center py-12">
      <div className="mb-6 text-[56px] text-serene-blue opacity-35 select-none animate-pulse">
        ◎
      </div>
      <h2 className="mb-3 font-serif text-[36px] font-bold tracking-tight text-slate-800">
        All clear.
      </h2>
      <p className="mb-10 font-sans text-base text-slate-500 max-w-sm leading-relaxed">
        {total} item{total !== 1 ? 's' : ''} reviewed and coordinated. Your awareness queue is serene and up to date for today.
      </p>
      <button 
        onClick={onReset}
        className="cursor-pointer rounded-xl border border-black/5 bg-slate-100 hover:bg-slate-200 px-8 py-3.5 font-sans text-sm font-bold text-slate-600 transition-all active:scale-[0.98]"
      >
        Restart Session
      </button>
    </div>
  );
}

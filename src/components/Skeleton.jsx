import React from 'react';

export default function Skeleton() {
  return (
    <div className="w-full max-w-xl mx-auto py-12 select-none animate-pulse">
      <section className="relative w-full rounded-custom border border-black/[0.03] bg-white p-8 shadow-xl shadow-slate-100/50 sm:p-10">
        
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-28 rounded-full bg-slate-100/80"></div>
          </div>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-100"></div>
        </div>

        <div className="h-9 w-3/4 rounded-lg bg-slate-100/80"></div>
        <div className="mt-2.5 h-9 w-1/2 rounded-lg bg-slate-100/80"></div>

        <div className="mt-4.5 h-4.5 w-2/3 rounded bg-slate-100/60"></div>

        <div className="my-8 border-t border-slate-100" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="h-4 w-40 rounded bg-slate-100/60"></div>

          <div className="h-12 w-32 rounded-xl bg-slate-100/80"></div>
        </div>

      </section>
    </div>
  );
}

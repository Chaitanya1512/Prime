import React from 'react';
import { TYPE_META } from '../data/items.jsx';

export default function ReviewCard({
  item,
  onPrimaryAction,
  onBrowseNext,
  onBrowsePrev,
  isExiting,
  direction
}) {
  const meta = TYPE_META[item.type] || { color: '#4A6580', label: 'Item', icon: null };

  const animationClass = isExiting
    ? (direction === 'done' ? 'slide-left' : 'slide-right')
    : 'slide-in';

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center p-4 ${animationClass}`}
      role="region"
      aria-label={`Awareness Card: ${item.title}`}
    >
      <button
        onClick={onBrowsePrev}
        className="hidden md:flex absolute md:-left-16 z-20 h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/70 text-slate-400 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-slate-700 active:scale-95"
        aria-label="Previous card"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      
      <section className="relative w-full max-w-xl rounded-custom border border-black/[0.03] bg-white p-6 shadow-xl shadow-slate-100/50 sm:p-10">
        <div className="mb-5 sm:mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest uppercase transition-all"
              style={{
                backgroundColor: meta.bg || 'rgba(0,0,0,0.03)',
                color: meta.color
              }}
            >
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full">
                {meta.icon}
              </span>
              <span>{meta.label}</span>
            </div>
          </div>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-200"></div>
        </div>

        <h2 className="font-serif text-2xl font-bold leading-tight tracking-tight text-slate-800 sm:text-4xl">
          {item.title}
        </h2>

        <p className="mt-2 text-sm font-medium text-slate-400 sm:text-base">
          {item.subtitle}
        </p>

        <div className="my-6 sm:my-8 border-t border-slate-100" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="min-h-[24px]">
            {item.status ? (
              <p className="text-sm font-medium text-slate-500 italic">
                {item.status}
              </p>
            ) : (
              <p className="text-sm text-slate-300 select-none">•</p>
            )}
          </div>

          <div>
            <button
              onClick={() => onPrimaryAction(item.id)}
              className="group flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-xl bg-serene-blue px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-serene-blue/20 transition-all hover:bg-serene-blue/90 hover:shadow-xl active:scale-[0.98]"
            >
              <span>{item.actions?.primary?.label || 'View'}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <button
        onClick={onBrowseNext}
        className="hidden md:flex absolute md:-left-auto md:-right-16 z-20 h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/70 text-slate-400 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-slate-700 active:scale-95"
        aria-label="Next card"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

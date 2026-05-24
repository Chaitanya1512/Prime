import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoading,
  setReady,
  markReviewed,
  skipItem,
  browseNext,
  browsePrev,
  resetItems,
  openSummary,
  closeSummary,
  setCurrentIndex
} from './store/reviewSlice';
import { TYPE_META } from './data/items.jsx';
import ReviewCard from './components/ReviewCard';
import AllClearScreen from './components/AllClearScreen';
import EvidencePanel from './components/EvidencePanel';
import Skeleton from './components/Skeleton';

function App() {
  const dispatch = useDispatch();
  const { remaining, reviewedIds, status, openItemId, currentIndex } = useSelector(
    state => state.reviews
  );

  const [exiting, setExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState('done');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    dispatch(setLoading());
    const timer = setTimeout(() => {
      dispatch(setReady());
    }, 1000);

    const timeInterval = setInterval(() => setCurrentTime(new Date()), 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, [dispatch]);

  const currentItem = remaining.length > 0 ? remaining[currentIndex] : null;
  const activeDetailItem = openItemId
    ? remaining.find(item => item.id === openItemId)
    : null;

  const transition = (direction, action) => {
    setExitDirection(direction);
    setExiting(true);
    setTimeout(() => {
      dispatch(action);
      setExiting(false);
    }, 350);
  };

  const handlePrimaryAction = (id) => {
    dispatch(openSummary(id));
  };

  const handleReviewComplete = () => {
    const itemId = openItemId || (currentItem ? currentItem.id : null);
    if (itemId) {
      dispatch(closeSummary());
      transition('done', markReviewed(itemId));
    }
  };

  const handleReviewCancel = () => {
    dispatch(closeSummary());
  };

  const handleBrowseNext = () => {
    dispatch(browseNext());
  };

  const handleBrowsePrev = () => {
    dispatch(browsePrev());
  };

  const handleReset = () => {
    dispatch(resetItems());
  };

  const hour = currentTime.getHours();
  let greeting = "Good evening.";
  if (hour >= 5 && hour < 12) greeting = "Good morning.";
  else if (hour >= 12 && hour < 17) greeting = "Good afternoon.";

  const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dayStr = currentTime.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden overflow-y-auto bg-serene-surface font-sans text-slate-800 selection:bg-serene-blue/10">
      
      <div
        className={`pointer-events-none fixed inset-0 z-[100] bg-serene-blue/15 backdrop-blur-[2px] transition-opacity duration-500 ${
          openItemId ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {activeDetailItem && (
        <EvidencePanel
          item={activeDetailItem}
          onSubmit={handleReviewComplete}
          onCancel={handleReviewCancel}
        />
      )}

      <header className="relative z-10 flex justify-between items-start w-full p-6 sm:p-8 select-none">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Prime</p>
          <h1 className="text-3xl font-serif font-bold mt-1 text-slate-800">{greeting}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-2xl font-bold font-serif text-slate-800">
              {timeStr.split(' ')[0]} <span className="text-lg">{timeStr.split(' ')[1]}</span>
            </p>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{dayStr}</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl">
          {status === 'loading' ? (
            <Skeleton />
          ) : remaining.length === 0 ? (
            <AllClearScreen total={reviewedIds.length} onReset={handleReset} />
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative w-full min-h-[440px] sm:min-h-[380px]">
                
                {currentItem && (
                  <div key={currentItem.id} className="h-full w-full">
                    <ReviewCard
                      item={currentItem}
                      onPrimaryAction={handlePrimaryAction}
                      onBrowseNext={handleBrowseNext}
                      onBrowsePrev={handleBrowsePrev}
                      isExiting={exiting}
                      direction={exitDirection}
                    />
                  </div>
                )}

              </div>

              {remaining.length > 1 && !exiting && !openItemId && (
                <div className="mt-14 flex flex-col items-center gap-3 fade-in select-none">
                  <div className="flex items-center gap-4">
                    {/* Mobile Previous Button */}
                    <button
                      onClick={handleBrowsePrev}
                      className="flex md:hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white text-slate-400 shadow-md transition-all hover:text-slate-700 active:scale-95"
                      aria-label="Previous card"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>

                    {remaining.map((item, idx) => {
                      const meta = TYPE_META[item.type] || { color: '#64748b' };
                      const isActive = currentIndex === idx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => dispatch(setCurrentIndex(idx))}
                          className="group relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all hover:scale-110 focus:outline-none"
                          aria-label={`Go to item ${idx + 1}`}
                        >
                          <span
                            className="h-2 w-2 rounded-full transition-all group-hover:opacity-100"
                            style={{
                              backgroundColor: meta.color,
                              opacity: isActive ? 1 : 0.25,
                              transform: isActive ? 'scale(1.2)' : 'scale(1)'
                            }}
                          />
                          {isActive && (
                            <span
                              className="absolute -bottom-1 h-0.5 w-4 rounded-full transition-all"
                              style={{ backgroundColor: meta.color }}
                            />
                          )}
                        </button>
                      );
                    })}

                    {/* Mobile Next Button */}
                    <button
                      onClick={handleBrowseNext}
                      className="flex md:hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white text-slate-400 shadow-md transition-all hover:text-slate-700 active:scale-95"
                      aria-label="Next card"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 p-6 sm:p-8 flex justify-end items-center w-full select-none">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">Prime V2</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

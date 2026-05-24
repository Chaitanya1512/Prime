import { createSlice } from '@reduxjs/toolkit';
import { ITEMS, prioritize } from '../data/items.jsx';

const DEFAULT_STATE = {
  skippedCounts: {},
  reviewedIds: [],
  remaining: prioritize(ITEMS, {}),
  status: 'idle',
  openItemId: null,
  currentIndex: 0,
};

const initialState = DEFAULT_STATE;

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = 'loading';
    },
    setReady: (state) => {
      state.status = 'ready';
    },
    openSummary: (state, action) => {
      state.openItemId = action.payload;
    },
    closeSummary: (state) => {
      state.openItemId = null;
    },
    markReviewed: (state, action) => {
      const itemId = action.payload;
      state.reviewedIds.push(itemId);
      const updatedRemaining = state.remaining.filter(item => item.id !== itemId);
      state.remaining = prioritize(updatedRemaining, state.skippedCounts);
      
      if (state.currentIndex >= state.remaining.length && state.remaining.length > 0) {
        state.currentIndex = state.remaining.length - 1;
      } else if (state.remaining.length === 0) {
        state.currentIndex = 0;
      }
    },
    skipItem: (state, action) => {
      const itemId = action.payload;
      state.skippedCounts[itemId] = (state.skippedCounts[itemId] || 0) + 1;
      
      const currentItem = state.remaining.find(item => item.id === itemId);
      const others = state.remaining.filter(item => item.id !== itemId);
      state.remaining = prioritize([...others, currentItem], state.skippedCounts);

      state.currentIndex = 0;
    },
    browseNext: (state) => {
      if (state.remaining.length > 0) {
        state.currentIndex = (state.currentIndex + 1) % state.remaining.length;
      }
    },
    browsePrev: (state) => {
      if (state.remaining.length > 0) {
        state.currentIndex = (state.currentIndex - 1 + state.remaining.length) % state.remaining.length;
      }
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    resetItems: (state) => {
      state.skippedCounts = {};
      state.reviewedIds = [];
      state.remaining = prioritize(ITEMS, {});
      state.status = 'ready';
      state.openItemId = null;
      state.currentIndex = 0;
    },
  },
});

export const {
  setLoading,
  setReady,
  openSummary,
  closeSummary,
  markReviewed,
  skipItem,
  browseNext,
  browsePrev,
  setCurrentIndex,
  resetItems
} = reviewSlice.actions;

export default reviewSlice.reducer;

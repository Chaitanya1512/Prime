# Prime

Modern teaching platforms are feature-rich and genuinely powerful. But somewhere between all that capability and the teacher sitting down for twenty minutes between classes, something begins to fragment. 

Work is distributed across too many surfaces. Small decisions live inside separate modules, notifications, tables and review flows. By the time the teacher reaches the thing that needed attention, the original thread of intent is often already gone. 

While thinking about this, I kept coming back to interfaces that reduce complexity by narrowing attention instead of expanding control; search engines, command palettes, feeds. 

Prime started as a small attempt to play with that idea. 

The friction isn't caused by bad software. Most platforms are well-built. The friction comes from constantly moving between things. 

To log attendance you open one module. To approve a drafted report comment you open another. To check on a student who's been missing deadlines you go somewhere else entirely. Each action is simple. The movement between them is what starts to feel heavy. 

Most dashboards are designed around visibility. Everything is surfaced at once: classes, assignments, alerts, notifications, analytics. The assumption is that the user will scan, filter, prioritise, and decide where to go next. 

But much of schoolwork doesn't happen in long uninterrupted sessions. It happens in fragments. Between classes. During transitions. In small operational windows where there isn't really time to navigate. 

Prime started from wondering what happens when the system handles more of that navigation itself. 

As the interface took shape, it became simpler and narrower. More of the design work shifted toward reducing the amount of movement between moments of work. The project gradually turned into about figuring out how far that interaction model could actually go in code. 

What started as a simple card interface slowly turned into a queueing system, a prioritisation layer, and a shared structure for very different kinds of workflows. 

At the center of it is a small global state store built with Redux Toolkit. The system mainly tracks what still needs attention, what has already been reviewed, what has been skipped, and what should appear next.

```js
// store/reviewSlice.js  
remaining  
reviewedIds  
skippedCounts  
currentIndex
```

Different workflows such as attendance reviews, drafted report comments, student alerts, all pass through the same queue before reaching the interface. 

Once everything started flowing through the same structure, the next problem became ordering. Some tasks are urgent for a few hours. Others can wait for days. Skipped items temporarily move lower in the queue so the same card doesn't immediately resurface after dismissal.

```js
// data/items.jsx  
export function prioritize(items, skippedCounts) {
```

The sorting itself stays fairly lightweight. Skip counts are checked first, urgency levels second, and everything else falls back to a stable order underneath. One thing that became important pretty quickly was consistency. Cards couldn't jump around unpredictably between actions, especially once the interface had been reduced down to a single stream.

```js
// App.jsx  
const transition = (direction, action) => {
```

Queue updates are slightly delayed until animations finish so the current card doesn't disappear out from under the interface mid-transition. As more workflows were added, most of the interface logic stayed surprisingly similar. Attendance confirmations, AI-generated drafts, scheduling updates, and student alerts eventually reduced down to the same basic structure: context, urgency, and a small set of possible actions.

```js
// data/items.jsx  
export const TYPE_META = {
```

The project ended up being less about building new workflows and more about reducing how differently existing workflows behaved once they reached the surface. 

The underlying systems stayed complex. The interface just became narrower.

---

## Stack

- React 19
- Redux Toolkit
- Tailwind CSS v4
- Vite

## Live Demo

[Link](https://chaitanya1512.github.io/Prime/)

## Setup

```bash
cd prime
npm install
npm run dev
```
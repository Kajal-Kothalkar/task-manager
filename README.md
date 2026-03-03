🗂 Mini Task Manager Dashboard

A modern task management dashboard built using React + TypeScript (TSX) with proper separation of server state and client state using:

⚛️ React + TypeScript

🎨 Tailwind CSS

🔄 TanStack Query

🐻 Zustand

This project demonstrates best practices for managing API data and global UI state separately.

🚀 Live API Used

Tasks are fetched from:

https://jsonplaceholder.typicode.com/todos?_limit=15

API provided by JSONPlaceholder

🧠 Core Concept

This project clearly demonstrates the difference between:

🔹 Server State (TanStack Query)

Fetched from API

Cached

Refetched when invalidated

Managed using useQuery & useMutation

🔹 Client / Global State (Zustand)

UI filter state

Instant updates

No API refetch on filter change

📦 Features Implemented
1️⃣ Task List (TanStack Query)

Fetch tasks using useQuery

Display:

Task Title

Completed / Pending Status

Loading State

Error State

Empty State

API data is NOT stored in Zustand

2️⃣ Filter System (Zustand)

Global filter store:

type FilterType = "all" | "completed" | "pending";

interface TaskFilterState {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
}
Filter Options:

All

Completed

Pending

Important Behavior:

Instant UI update

No API refetch

Filtering handled client-side

3️⃣ Dashboard Stats Section

Three stat cards:

📊 Total Tasks

✅ Completed Tasks

⏳ Pending Tasks

Stats are:

Derived from fetched data

Properly calculated

Automatically recomputed when filter changes

4️⃣ Add New Task (useMutation)

Input field for task title

Add Task button

Simulated API call

After success:

Query invalidated

Task list refetched

🖥 UI Structure
Layout Includes:

Static Sidebar

Main Dashboard Area

Stats Section (Top)

Filter Buttons

Task List

Add Task Form

Tailwind UI Expectations:

Clean spacing

Card-based layout

Hover effects

Proper alignment

Responsive design

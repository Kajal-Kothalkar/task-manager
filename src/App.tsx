import { useState } from "react";
import CursorRing from "./components/CursorRing";
import Loader from "./components/Loader";

import Sidebar from "./components/Sidebar";
import StatsSection from "./components/StatsSection";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return (
    <>
      <CursorRing />

      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
        
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-30 transition-transform duration-300 ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">

            {/* Header */}
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden w-10 h-10 rounded-xl bg-sky-100 border border-sky-300 text-sky-700 hover:bg-sky-200 transition-all flex items-center justify-center shadow-sm"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white text-lg shadow-md shadow-sky-400">
                  🏠
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-sky-100 tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-white text-sm mt-0.5">
                    Turn your 'to-do' into 'done'.
                  </p>
                </div>
              </div>
            </div>

            <StatsSection />
            <AddTaskForm />

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-lg font-bold text-sky-100">
                  Task List
                </h2>
                <FilterButtons />
              </div>
              <TaskList />
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "../store/filterStore";
import type { Task } from "../types/task";

async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=15");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export default function TaskList() {
  const { filter } = useFilterStore();

  const { data: tasks, isLoading, isError } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Loading
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="rounded-xl p-5 shimmer-loading h-16" style={{ animationDelay: `${i * 0.1}s` }}></div>
        ))}
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="rounded-2xl p-8 text-center bg-red-500/10 border border-red-500/20">
        <p className="text-3xl mb-2">❌</p>
        <p className="font-semibold text-red-400">Failed to load tasks.</p>
        <p className="text-sm mt-1 text-slate-500">Check your internet connection and try again.</p>
      </div>
    );
  }

  // Filter
  const filtered = tasks?.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending")   return !task.completed;
    return true;
  });

  // Empty
  if (!filtered || filtered.length === 0) {
    return (
      <div className="rounded-2xl p-10 text-center bg-white border border-slate-700/50">
        <p className="text-5xl mb-3">📭</p>
        <p className="font-semibold text-[#000080] text-lg">No tasks found</p>
        <p className="text-sm mt-1 text-[#000080]">
          {filter === "completed" && "No completed tasks yet."}
          {filter === "pending"   && "No pending tasks. Great job! 🎉"}
          {filter === "all"       && "Add a task above to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-white font-medium uppercase tracking-wider px-1">
        Showing {filtered.length} task{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.map((task, i) => (
        <div
          key={task.id}
          style={{ animationDelay: `${i * 0.04}s` }}
          className="animate-fade-in-up opacity-0 group flex items-center justify-between gap-3 p-4 rounded-xl bg-sky-100 border border-slate-700/50 hover:bg-sky-300 hover:border-indigo-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200"
        >
          {/* Circle + Title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? "bg-emerald-500 border-emerald-500 shadow-sm shadow-emerald-500/50"
                : "border-slate-600 group-hover:border-indigo-400"
            }`}>
              {task.completed && <span className="text-[#000080] text-xs font-bold">✓</span>}
            </div>

            <p className={`text-sm font-medium capitalize truncate transition-colors duration-200 ${
              task.completed
                ? "line-through text-slate-500"
                : "text-black group-hover:text-white"
            }`}>
              {task.title}
            </p>
          </div>

          {/* Badge */}
          <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 transition-all duration-200 ${
            task.completed
              ? "bg-[#008000] text-white border border-emerald-500/25"
              : "bg-[#FFA500] text-white border border-amber-500/25"
          }`}>
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
      ))}
    </div>
  );
}
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../types/task";

async function addTaskApi(title: string): Promise<Task> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), title, completed: false, userId: 1 });
    }, 800);
  });
}

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
    },
  });

  const handleAdd = () => {
    if (!title.trim()) return;
    mutation.mutate(title.trim());
  };

  return (
    <div className="animate-fade-in-up opacity-0 stagger-3 rounded-2xl p-4 sm:p-6 bg-sky-100 border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
      
      <h2 className="text-base font-semibold text-[#000080] mb-4 flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-indigo-500 border border-indigo-500/40 flex items-center justify-center text-white text-sm">
          +
        </span>
        Add New Task
      </h2>

      {/* ✅ Responsive Fix Here */}
      <div className="flex flex-col sm:flex-row gap-3">

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Enter task title..."
          className="w-full sm:flex-1 bg-indigo-500 border border-slate-700 text-white placeholder-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
        />

        <button
          onClick={handleAdd}
          disabled={mutation.isPending || !title.trim()}
          className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 disabled:bg-sky-300 disabled:text-white disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
        >
          {mutation.isPending ? (
            <>
              <span className="animate-spin inline-block">⏳</span>
              Adding...
            </>
          ) : (
            <>
              <span>+</span>
              Add Task
            </>
          )}
        </button>
      </div>

      {mutation.isSuccess && (
        <div className="animate-fade-in mt-3 flex items-center gap-2 text-emerald-500 text-sm font-medium bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2">
          <span>✅</span> Task added successfully! List will refresh shortly.
        </div>
      )}

      {mutation.isError && (
        <div className="animate-fade-in mt-3 flex items-center gap-2 text-red-500 text-sm font-medium bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
          <span>❌</span> Failed to add task. Please try again.
        </div>
      )}
    </div>
  );
}
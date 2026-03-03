import { useQuery } from "@tanstack/react-query";
import type { Task } from "../types/task";
import StatsCard from "./StatsCard";

export default function StatsSection() {
  const { data: tasks } = useQuery<Task[]>({ queryKey: ["tasks"] });

  const total     = tasks?.length ?? 0;
  const completed = tasks?.filter((t) => t.completed).length ?? 0;
  const pending   = total - completed;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsCard title="Total Tasks"      value={total}     gradient="bg-indigo-500"  icon="📋" delay="0.05s" />
      <StatsCard title="Completed Tasks"  value={completed} gradient="bg-emerald-500" icon="✅" delay="0.1s"  />
      <StatsCard title="Pending Tasks"    value={pending}   gradient="bg-amber-500"   icon="⏳" delay="0.15s" />
    </div>
  );
}
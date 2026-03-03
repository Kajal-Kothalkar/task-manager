import { useEffect, useRef, useState } from "react";
import { useFilterStore } from "../store/filterStore";

type FilterType = "all" | "completed" | "pending";

const filters: { label: string; value: FilterType; icon: string }[] = [
  { label: "All Tasks", value: "all", icon: "📋" },
  { label: "Completed", value: "completed", icon: "✅" },
  { label: "Pending", value: "pending", icon: "⏳" },
];

export default function FilterButtons() {
  const { filter, setFilter } = useFilterStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const activeButton = buttonRefs.current[filter];
    const container = containerRef.current;

    if (activeButton && container) {
      const { offsetLeft, offsetWidth } = activeButton;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [filter]);

  return (
    <div
      ref={containerRef}
      className="relative flex gap-1 p-1 bg-sky-200 rounded-2xl border border-slate-700/50 w-full sm:w-fit"
    >
      {/* Sliding Active Background */}
      <div
        className="absolute top-1 bottom-1 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 ease-in-out"
        style={{
          width: indicatorStyle.width,
          left: indicatorStyle.left,
        }}
      />

      {filters.map((f) => (
        <button
          key={f.value}
          ref={(el) => {
            buttonRefs.current[f.value] = el;
          }}
          onClick={() => setFilter(f.value)}
          className={`relative z-10 flex items-center justify-center gap-1 flex-1 sm:flex-none px-2 sm:px-4 py-2 rounded-xl font-medium text-[11px] sm:text-sm transition-colors duration-300 whitespace-nowrap ${
            filter === f.value
              ? "text-white"
              : "text-black hover:text-indigo-600"
          }`}
        >
          <span className="text-sm sm:text-base shrink-0">{f.icon}</span>
          {f.label}
        </button>
      ))}
    </div>
  );
}
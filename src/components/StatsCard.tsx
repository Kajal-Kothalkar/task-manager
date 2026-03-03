interface StatsCardProps {
  title: string;
  value: number;
  gradient: string;
  icon: string;
  delay?: string;
}

export default function StatsCard({ title, value, gradient, icon, delay = "0s" }: StatsCardProps) {
  return (
    <div
      style={{ animationDelay: delay }}
      className="
  animate-fade-in-up 
  opacity-0 
  group 
  relative 
  overflow-hidden 
  rounded-2xl 
  p-6 
  border 
  border-slate-700/50 
  bg-sky-100 
  backdrop-blur-sm 
  transition-all 
  duration-500 
  ease-[cubic-bezier(0.34,1.56,0.64,1)]
  cursor-default
  hover:-translate-y-2
hover:scale-[1.02]
  hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]
  hover:border-slate-500
"
    >
      {/* Gradient blob background */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-xl ${gradient} group-hover:opacity-30 transition-opacity duration-300`}></div>

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-black text-sm font-medium mb-1">{title}</p>
          <p className="text-4xl font-bold text-[#000080] tracking-tight">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center text-2xl shadow-md shadow-slate-400 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
interface SidebarProps {
  onClose?: () => void;
}

const navItems = [
  { icon: "⚡", label: "Dashboard", active: true },
  { icon: "✅", label: "My Tasks", active: false },
  { icon: "📊", label: "Reports", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="w-56 h-full min-h-screen flex flex-col bg-sky-100 border-r border-sky-200 shadow-md">
      
      {/* Logo */}
<div className="px-5 py-5 border-b border-sky-200 flex items-center justify-between">
  <div className="flex items-center gap-3">
    
    {/* Logo Image */}
    <img
      src="/logo.svg"
      alt="TaskFlow Logo"
      className="w-8 h-8 object-contain"
    />

    {/* Title */}
    <h1 className="text-xl font-bold text-sky-700 tracking-tight">
      TaskFlow
    </h1>

  </div>
        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-sky-600 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item, i) => (
          <div
            key={item.label}
            style={{ animationDelay: `${i * 0.06}s` }}
            className={`animate-fade-in-up flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
              ${
                item.active
                  ? "bg-sky-200 text-sky-800"
                  : "text-sky-700 hover:bg-sky-200/70 hover:text-sky-900"
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.active && (
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
            )}
          </div>
        ))}
      </nav>

      {/* User Card (Now at Bottom) */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            J
          </div>

          <div className="min-w-0">
            <p className="text-slate-800 text-sm font-semibold truncate">
              Julia
            </p>
            <p className="text-slate-500 text-xs truncate">
              julia@example.com
            </p>
          </div>

        </div>
      </div>

    </aside>
  );
}
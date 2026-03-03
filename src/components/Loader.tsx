import { useEffect, useState } from "react";

interface LoaderProps {
  onFinish: () => void;
}

export default function Loader({ onFinish }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300); // small delay before switching
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);

  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 z-[99999]">
      <div className="flex flex-col items-center gap-6">
        
        <div className="relative">
          <svg height={radius * 2} width={radius * 2}>
            <circle
              stroke="#334155"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            <circle
              stroke="#38bdf8"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-75"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-sky-200">
              {progress}%
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-sky-200 tracking-wide">
          TaskFlow
        </h1>
      </div>
    </div>
  );
}
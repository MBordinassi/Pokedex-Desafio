import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue }) => {
  // Calculate percentage for the progress bar
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  // Determine color based on stat value
  const getStatColor = (value: number) => {
    if (value < 30) return 'bg-red-500';
    if (value < 60) return 'bg-orange-400';
    if (value < 90) return 'bg-yellow-400';
    return 'bg-green-500';
  };
  
  const barColor = getStatColor(value);
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${barColor} transition-all duration-500 ease-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;
import React from 'react';

interface StatusCardProps {
  title: string;
  count: number;
  total: number;
  color: string;
  icon: React.ReactNode;
}

export const StatusCard: React.FC<StatusCardProps> = ({ title, count, total, color, icon }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
          {icon}
        </div>
        <span className="text-3xl font-bold text-gray-800">{count}</span>
      </div>
      <h3 className="text-gray-600 font-medium mb-2">{title}</h3>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${color.replace('border-', 'bg-')}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
    </div>
  );
};

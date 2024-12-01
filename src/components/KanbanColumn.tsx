import React from 'react';
import { Process } from '../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  color: string;
  processes: Process[];
  onProcessClick: (process: Process) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  color,
  processes,
  onProcessClick,
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      gray: 'bg-gray-50 border-gray-200',
      blue: 'bg-blue-50 border-blue-200',
      yellow: 'bg-yellow-50 border-yellow-200',
      green: 'bg-green-50 border-green-200',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="flex-shrink-0 w-80">
      <div className={`rounded-lg border ${getColorClasses(color)} p-4`}>
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
          {title}
          <span className="bg-white text-sm py-1 px-2 rounded-full">
            {processes.length}
          </span>
        </h3>
        <div className="space-y-3">
          {processes.map(process => (
            <KanbanCard
              key={process.id}
              process={process}
              onClick={() => onProcessClick(process)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
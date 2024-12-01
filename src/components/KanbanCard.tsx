import React from 'react';
import { Calendar, User } from 'lucide-react';
import { Process } from '../types';

interface KanbanCardProps {
  process: Process;
  onClick: () => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ process, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <h4 className="font-medium text-gray-900 mb-2">{process.name}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {process.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <User size={14} className="mr-1" />
          <span>{process.responsibleId}</span>
        </div>
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          <span>{new Date(process.expectedEndDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
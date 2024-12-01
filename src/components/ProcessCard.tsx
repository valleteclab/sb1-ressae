import React from 'react';
import { Clock, User, FileText } from 'lucide-react';
import { Process } from '../types';

interface ProcessCardProps {
  process: Process;
  onClick: (process: Process) => void;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ process, onClick }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  return (
    <div
      onClick={() => onClick(process)}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{process.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(process.status)}`}>
          {process.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{process.description}</p>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          <span>{new Date(process.startDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <User size={16} className="mr-1" />
          <span>{process.responsibleId}</span>
        </div>
        <div className="flex items-center">
          <FileText size={16} className="mr-1" />
          <span>{process.stages.length} etapas</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;
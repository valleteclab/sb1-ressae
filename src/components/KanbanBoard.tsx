import React from 'react';
import { Process } from '../types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  processes: Process[];
  onProcessClick: (process: Process) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ processes, onProcessClick }) => {
  const columns = [
    { id: 'draft', title: 'Rascunho', color: 'gray' },
    { id: 'in_progress', title: 'Em Andamento', color: 'blue' },
    { id: 'under_review', title: 'Em Revisão', color: 'yellow' },
    { id: 'completed', title: 'Concluído', color: 'green' },
  ];

  const getProcessesByStatus = (status: string) => {
    return processes.filter(process => process.status === status);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map(column => (
        <KanbanColumn
          key={column.id}
          title={column.title}
          color={column.color}
          processes={getProcessesByStatus(column.id)}
          onProcessClick={onProcessClick}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
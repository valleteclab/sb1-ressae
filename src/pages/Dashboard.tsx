import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import { Process } from '../types';
import { Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  
  // Example processes data
  const processes: Process[] = [
    {
      id: '1',
      name: 'Aquisição de Equipamentos de TI',
      description: 'Processo para aquisição de computadores e periféricos',
      startDate: '2024-03-14',
      expectedEndDate: '2024-06-14',
      responsibleId: 'João Silva',
      status: 'in_progress',
      stages: [],
      createdAt: '2024-03-14',
      updatedAt: '2024-03-14'
    },
    {
      id: '2',
      name: 'Contratação de Serviços de Limpeza',
      description: 'Processo para contratação de empresa de limpeza',
      startDate: '2024-03-15',
      expectedEndDate: '2024-05-15',
      responsibleId: 'Maria Santos',
      status: 'draft',
      stages: [],
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15'
    },
    {
      id: '3',
      name: 'Reforma do Auditório',
      description: 'Processo para reforma completa do auditório principal',
      startDate: '2024-03-10',
      expectedEndDate: '2024-07-10',
      responsibleId: 'Carlos Oliveira',
      status: 'under_review',
      stages: [],
      createdAt: '2024-03-10',
      updatedAt: '2024-03-10'
    }
  ];

  const handleProcessClick = (process: Process) => {
    console.log('Process clicked:', process);
  };

  return (
    <div className="max-w-full mx-auto px-4">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quadro de Processos</h1>
          <p className="text-gray-600">Gerencie seus processos de licitação</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </button>
          <button 
            onClick={() => navigate('/processes/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Processo
          </button>
        </div>
      </div>

      <KanbanBoard
        processes={processes}
        onProcessClick={handleProcessClick}
      />
    </div>
  );
}

export default Dashboard;
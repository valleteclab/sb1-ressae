import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import ProcessCard from '../components/ProcessCard';
import { Process } from '../types';

const ProcessList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Example processes data (to be replaced with real data)
  const processes: Process[] = [
    {
      id: '1',
      name: 'Aquisição de Equipamentos de TI',
      description: 'Processo para aquisição de computadores e periféricos para o departamento de TI',
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
      description: 'Processo para contratação de empresa especializada em serviços de limpeza',
      startDate: '2024-03-15',
      expectedEndDate: '2024-05-15',
      responsibleId: 'Maria Santos',
      status: 'draft',
      stages: [],
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15'
    }
  ];

  const filteredProcesses = processes.filter(process =>
    process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProcessClick = (process: Process) => {
    console.log('Process clicked:', process);
  };

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Processos de Licitação</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Processo
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar processos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProcesses.map((process) => (
          <ProcessCard
            key={process.id}
            process={process}
            onClick={handleProcessClick}
          />
        ))}
      </div>

      {filteredProcesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum processo encontrado</p>
        </div>
      )}
    </div>
  );
};

export default ProcessList;
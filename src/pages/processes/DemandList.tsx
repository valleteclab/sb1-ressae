import React, { useState } from 'react';
import { Plus, Search, Clock, User, Building2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Demand } from '../../types';

const DemandList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Example demands data (to be replaced with API data)
  const demands: Demand[] = [
    {
      id: '1',
      departmentId: '1',
      requesterId: '1',
      type: 'acquisition',
      object: 'Aquisição de Equipamentos de TI',
      description: 'Aquisição de computadores e periféricos para o departamento',
      items: [
        { description: 'Notebook Dell Latitude', unit: 'UN', quantity: 10 },
        { description: 'Monitor 24"', unit: 'UN', quantity: 15 }
      ],
      estimatedValue: 150000,
      justification: 'Necessidade de atualização do parque tecnológico',
      quantityJustification: 'Baseado no número de funcionários',
      priority: 'high',
      deliveryLocation: 'Setor de TI',
      deliveryDeadline: '2024-06-30',
      supervisorId: '2',
      status: 'pending',
      createdAt: '2024-03-15',
      updatedAt: '2024-03-15'
    },
    {
      id: '2',
      departmentId: '2',
      requesterId: '2',
      type: 'service',
      object: 'Contratação de Serviços de Limpeza',
      description: 'Serviços de limpeza e conservação predial',
      items: [],
      estimatedValue: 200000,
      justification: 'Manutenção da limpeza do prédio',
      quantityJustification: 'Área total do prédio',
      priority: 'medium',
      deliveryLocation: 'Todos os setores',
      deliveryDeadline: '2024-05-30',
      supervisorId: '3',
      status: 'draft',
      createdAt: '2024-03-14',
      updatedAt: '2024-03-14'
    }
  ];

  const getStatusColor = (status: Demand['status']) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Demand['priority']) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredDemands = demands.filter(demand =>
    demand.object.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demand.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Demandas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie as demandas de contratação do seu setor
          </p>
        </div>
        <button
          onClick={() => navigate('/processes/demand/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Demanda
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar demandas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredDemands.map((demand) => (
            <li key={demand.id} className="hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-blue-600 truncate">
                        {demand.object}
                      </p>
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(demand.status)}`}>
                          {demand.status === 'draft' && 'Rascunho'}
                          {demand.status === 'pending' && 'Em Análise'}
                          {demand.status === 'approved' && 'Aprovada'}
                          {demand.status === 'rejected' && 'Rejeitada'}
                        </span>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(demand.priority)}`}>
                          {demand.priority === 'low' && 'Baixa'}
                          {demand.priority === 'medium' && 'Média'}
                          {demand.priority === 'high' && 'Alta'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {demand.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <Building2 className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        <span>Departamento {demand.departmentId}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        <span>Solicitante {demand.requesterId}</span>
                      </div>
                      <div className="flex items-center">
                        <AlertCircle className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        <span>{demand.type === 'acquisition' ? 'Aquisição' : 'Serviço'}</span>
                      </div>
                      <div className="flex items-center font-medium text-gray-900">
                        {formatCurrency(demand.estimatedValue)}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      <span>Prazo: {new Date(demand.deliveryDeadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {filteredDemands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma demanda encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemandList;
import React, { useState } from 'react';
import { Search, Clock, User, Building2, AlertCircle } from 'lucide-react';
import { Demand } from '../../types';
import DemandStatusBadge from '../../components/processes/DemandStatusBadge';
import DemandApprovalModal from '../../components/processes/DemandApprovalModal';

const DemandApprovals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

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
      status: 'pending_approval',
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
      status: 'pending_approval',
      createdAt: '2024-03-14',
      updatedAt: '2024-03-14'
    }
  ];

  const handleApprove = (comments: string) => {
    if (selectedDemand) {
      console.log('Approved demand:', selectedDemand.id, 'Comments:', comments);
      // TODO: Implement API call to approve demand
    }
  };

  const handleReject = (comments: string) => {
    if (selectedDemand) {
      console.log('Rejected demand:', selectedDemand.id, 'Comments:', comments);
      // TODO: Implement API call to reject demand
    }
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Aprovações Pendentes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gerencie as demandas que necessitam da sua aprovação
        </p>
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
            <li 
              key={demand.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSelectedDemand(demand);
                setIsApprovalModalOpen(true);
              }}
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-blue-600 truncate">
                        {demand.object}
                      </p>
                      <div className="ml-4 flex-shrink-0">
                        <DemandStatusBadge status={demand.status} />
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

      {selectedDemand && (
        <DemandApprovalModal
          isOpen={isApprovalModalOpen}
          onClose={() => {
            setIsApprovalModalOpen(false);
            setSelectedDemand(null);
          }}
          demand={selectedDemand}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default DemandApprovals;
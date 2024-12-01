import React, { useState } from 'react';
import DemandForm from '../../components/processes/DemandForm';
import { Demand, Department, User } from '../../types';
import { FileText } from 'lucide-react';

const DemandCreate: React.FC = () => {
  // Example data (to be replaced with API data)
  const [departments] = useState<Department[]>([
    { 
      id: '1', 
      name: 'Tecnologia da Informação',
      description: 'Departamento de TI',
      managerId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    { 
      id: '2', 
      name: 'Recursos Humanos',
      description: 'Departamento de RH',
      managerId: '2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@example.com',
      role: 'manager',
      department: 'Tecnologia da Informação',
      position: 'Gerente de TI',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      role: 'user',
      department: 'Recursos Humanos',
      position: 'Analista de RH',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const handleSubmit = (demandData: Omit<Demand, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    console.log('New demand data:', demandData);
    // TODO: Implement API call to create demand
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Formalização de Demanda</h1>
        </div>
        <p className="text-sm text-gray-600">
          Preencha o formulário abaixo para formalizar uma nova demanda de licitação. 
          O processo será iniciado após a aprovação da demanda.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <DemandForm 
          onSubmit={handleSubmit}
          departments={departments}
          users={users}
        />
      </div>
    </div>
  );
};

export default DemandCreate;
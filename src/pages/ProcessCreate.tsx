import React from 'react';
import ProcessForm from '../components/ProcessForm';
import { Process } from '../types';

const ProcessCreate: React.FC = () => {
  const handleSubmit = (processData: Omit<Process, 'id' | 'createdAt' | 'updatedAt' | 'stages'>) => {
    console.log('New process data:', processData);
    // TODO: Implement API call to create process
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Criar Novo Processo</h1>
        <p className="mt-1 text-sm text-gray-600">
          Preencha as informações abaixo para criar um novo processo de licitação.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <ProcessForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ProcessCreate;
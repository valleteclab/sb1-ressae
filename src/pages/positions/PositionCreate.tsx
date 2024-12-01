import React from 'react';
import PositionForm from './PositionForm';
import { Position } from '../../types';

const PositionCreate: React.FC = () => {
  const handleSubmit = (positionData: Omit<Position, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('New position data:', positionData);
    // TODO: Implement API call to create position
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Cargo</h1>
        <p className="mt-1 text-sm text-gray-600">
          Preencha as informações abaixo para criar um novo cargo no sistema.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <PositionForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default PositionCreate;
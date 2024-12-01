import React from 'react';
import DepartmentForm from './DepartmentForm';
import { Department } from '../../types';

const DepartmentCreate: React.FC = () => {
  // Example users data (to be replaced with API data)
  const users = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Santos' },
    { id: '3', name: 'Carlos Oliveira' }
  ];

  const handleSubmit = (departmentData: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('New department data:', departmentData);
    // TODO: Implement API call to create department
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Departamento/Setor</h1>
        <p className="mt-1 text-sm text-gray-600">
          Preencha as informações abaixo para criar um novo departamento ou setor no sistema.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <DepartmentForm onSubmit={handleSubmit} users={users} />
      </div>
    </div>
  );
};

export default DepartmentCreate;
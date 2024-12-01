import React, { useState } from 'react';
import UserForm from '../../components/users/UserForm';
import { User, Position, Department } from '../../types';

const UserCreate: React.FC = () => {
  // Example departments data (to be replaced with API data)
  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'Tecnologia da Informação', description: 'Departamento de TI', managerId: '1', createdAt: '', updatedAt: '' },
    { id: '2', name: 'Recursos Humanos', description: 'Departamento de RH', managerId: '2', createdAt: '', updatedAt: '' },
    { id: '3', name: 'Financeiro', description: 'Departamento Financeiro', managerId: '3', createdAt: '', updatedAt: '' }
  ]);

  // Example positions data (to be replaced with API data)
  const [positions, setPositions] = useState<Position[]>([
    { id: '1', name: 'Desenvolvedor', code: 'DEV', description: 'Desenvolvedor de Software', status: 'active', createdAt: '', updatedAt: '' },
    { id: '2', name: 'Analista', code: 'ANA', description: 'Analista de Sistemas', status: 'active', createdAt: '', updatedAt: '' }
  ]);

  const handleSubmit = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    console.log('New user data:', userData);
    // TODO: Implement API call to create user
  };

  const handleAddPosition = (positionData: Omit<Position, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPosition = {
      ...positionData,
      id: String(positions.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPositions([...positions, newPosition]);
  };

  const handleAddDepartment = (departmentData: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDepartment = {
      ...departmentData,
      id: String(departments.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setDepartments([...departments, newDepartment]);
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Usuário</h1>
        <p className="mt-1 text-sm text-gray-600">
          Preencha as informações abaixo para criar um novo usuário no sistema.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <UserForm 
          onSubmit={handleSubmit}
          departments={departments}
          positions={positions}
          onAddPosition={handleAddPosition}
          onAddDepartment={handleAddDepartment}
        />
      </div>
    </div>
  );
};

export default UserCreate;
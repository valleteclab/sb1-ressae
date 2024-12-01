import React from 'react';
import OrganizationForm from './OrganizationForm';
import { Organization } from '../../types';

const OrganizationCreate: React.FC = () => {
  const handleSubmit = (organizationData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt' | 'departments'>) => {
    console.log('New organization data:', organizationData);
    // TODO: Implement API call to create organization
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Órgão</h1>
        <p className="mt-1 text-sm text-gray-600">
          Preencha as informações abaixo para cadastrar um novo órgão no sistema.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <OrganizationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default OrganizationCreate;
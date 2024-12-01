import React, { useState } from 'react';
import { Save, Building2, User } from 'lucide-react';
import { Department } from '../../types';

interface DepartmentFormProps {
  onSubmit: (departmentData: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) => void;
  users: { id: string; name: string }[];
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ onSubmit, users }) => {
  const [formData, setFormData] = useState<Omit<Department, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    managerId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome do Departamento/Setor
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
            <Building2 className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="managerId" className="block text-sm font-medium text-gray-700">
            Gestor Responsável
          </label>
          <div className="mt-1 relative">
            <select
              id="managerId"
              value={formData.managerId}
              onChange={(e) => setFormData(prev => ({ ...prev, managerId: e.target.value }))}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            >
              <option value="">Selecione um gestor</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <User className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Departamento
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;
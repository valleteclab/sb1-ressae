import React, { useState } from 'react';
import { Plus, Search, Pencil, Trash2, Building2 } from 'lucide-react';
import { Department } from '../../types';
import { useNavigate } from 'react-router-dom';

const DepartmentList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Example departments data (to be replaced with API data)
  const departments: Department[] = [
    {
      id: '1',
      name: 'Tecnologia da Informação',
      description: 'Departamento responsável pela infraestrutura e sistemas de TI',
      managerId: '1',
      createdAt: '2024-03-14',
      updatedAt: '2024-03-14'
    },
    {
      id: '2',
      name: 'Recursos Humanos',
      description: 'Departamento responsável pela gestão de pessoas',
      managerId: '2',
      createdAt: '2024-03-14',
      updatedAt: '2024-03-14'
    }
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Departamentos/Setores</h1>
        <button
          onClick={() => navigate('/departments/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Departamento
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar departamentos..."
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
          {filteredDepartments.map((department) => (
            <li key={department.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Building2 className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{department.name}</div>
                      <div className="text-sm text-gray-500">{department.description}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum departamento encontrado</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
import React, { useState } from 'react';
import { User, Position, Department } from '../../types';
import { Save, User as UserIcon, Mail, Building2, Briefcase, Plus } from 'lucide-react';
import QuickAddPositionModal from './QuickAddPositionModal';
import QuickAddDepartmentModal from './QuickAddDepartmentModal';

interface UserFormProps {
  onSubmit: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => void;
  departments: Department[];
  positions: Position[];
  onAddPosition: (position: Omit<Position, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onAddDepartment: (department: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const UserForm: React.FC<UserFormProps> = ({ 
  onSubmit, 
  departments, 
  positions,
  onAddPosition,
  onAddDepartment 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user' as User['role'],
    department: '',
    position: '',
    avatar: ''
  });

  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome Completo
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
              <UserIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <div className="mt-1 relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              />
              <Mail className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Setor
            </label>
            <div className="mt-1 flex gap-2">
              <div className="relative flex-1">
                <select
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="">Selecione um setor</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
                <Building2 className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="button"
                onClick={() => setIsDepartmentModalOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Cargo
            </label>
            <div className="mt-1 flex gap-2">
              <div className="relative flex-1">
                <select
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="">Selecione um cargo</option>
                  {positions.map(pos => (
                    <option key={pos.id} value={pos.id}>{pos.name}</option>
                  ))}
                </select>
                <Briefcase className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="button"
                onClick={() => setIsPositionModalOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Perfil de Acesso
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as User['role'] }))}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              required
            >
              <option value="user">Usuário</option>
              <option value="manager">Gestor</option>
              <option value="auditor">Auditor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Usuário
          </button>
        </div>
      </form>

      <QuickAddPositionModal
        isOpen={isPositionModalOpen}
        onClose={() => setIsPositionModalOpen(false)}
        onSubmit={onAddPosition}
      />

      <QuickAddDepartmentModal
        isOpen={isDepartmentModalOpen}
        onClose={() => setIsDepartmentModalOpen(false)}
        onSubmit={onAddDepartment}
      />
    </>
  );
};

export default UserForm;
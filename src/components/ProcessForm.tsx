import React, { useState } from 'react';
import { Calendar, User, FileText, Save } from 'lucide-react';
import { Process } from '../types';

interface ProcessFormProps {
  onSubmit: (process: Omit<Process, 'id' | 'createdAt' | 'updatedAt' | 'stages'>) => void;
}

const ProcessForm: React.FC<ProcessFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    expectedEndDate: '',
    responsibleId: '',
    status: 'draft' as Process['status']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome do Processo
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required
          />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Data de Início
          </label>
          <div className="mt-1 relative">
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
            <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="expectedEndDate" className="block text-sm font-medium text-gray-700">
            Data de Término Prevista
          </label>
          <div className="mt-1 relative">
            <input
              type="date"
              id="expectedEndDate"
              value={formData.expectedEndDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expectedEndDate: e.target.value }))}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
            <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="responsibleId" className="block text-sm font-medium text-gray-700">
          Responsável
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            id="responsibleId"
            value={formData.responsibleId}
            onChange={(e) => setFormData(prev => ({ ...prev, responsibleId: e.target.value }))}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required
          />
          <User className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Processo
        </button>
      </div>
    </form>
  );
};

export default ProcessForm;
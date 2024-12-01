import React, { useState } from 'react';
import { Demand, Department, User, DemandItem } from '../../types';
import { Save, Plus, Trash2, AlertCircle } from 'lucide-react';

interface DemandFormProps {
  onSubmit: (demandData: Omit<Demand, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  departments?: Department[];
  users?: User[];
}

const DemandForm: React.FC<DemandFormProps> = ({ 
  onSubmit,
  departments = [],
  users = []
}) => {
  const [formData, setFormData] = useState<Omit<Demand, 'id' | 'createdAt' | 'updatedAt' | 'status'>>({
    departmentId: '',
    requesterId: '', // Will be filled with logged user
    type: 'acquisition',
    object: '',
    description: '',
    items: [],
    estimatedValue: 0,
    justification: '',
    quantityJustification: '',
    priority: 'medium',
    deliveryLocation: '',
    deliveryDeadline: '',
    supervisorId: ''
  });

  const [items, setItems] = useState<DemandItem[]>([]);
  const [activeSection, setActiveSection] = useState(1);

  const handleAddItem = () => {
    setItems([...items, { description: '', unit: '', quantity: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof DemandItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'quantity') {
      newItems[index] = { ...newItems[index], [field]: Number(value) || 0 };
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, items });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      {/* Section 1: Basic Information */}
      <div className="space-y-6 pt-8 px-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Informações Básicas</h3>
          <p className="mt-1 text-sm text-gray-500">
            Preencha as informações básicas da demanda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Setor Demandante
            </label>
            <select
              id="department"
              value={formData.departmentId}
              onChange={(e) => setFormData(prev => ({ ...prev, departmentId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="">Selecione um setor</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Tipo de Demanda
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'acquisition' | 'service' }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="acquisition">Aquisição</option>
              <option value="service">Serviço</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="object" className="block text-sm font-medium text-gray-700">
              Objeto/Identificação da Demanda
            </label>
            <input
              type="text"
              id="object"
              value={formData.object}
              onChange={(e) => setFormData(prev => ({ ...prev, object: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição Detalhada
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>

      {/* Section 2: Items */}
      {formData.type === 'acquisition' && (
        <div className="space-y-6 pt-8 px-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Itens da Aquisição</h3>
            <p className="mt-1 text-sm text-gray-500">
              Adicione os itens que serão adquiridos.
            </p>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Descrição do item"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="w-32">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    placeholder="Unidade"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    placeholder="Quantidade"
                    min="0"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </button>
          </div>
        </div>
      )}

      {/* Section 3: Additional Information */}
      <div className="space-y-6 pt-8 px-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Informações Adicionais</h3>
          <p className="mt-1 text-sm text-gray-500">
            Complete as informações adicionais necessárias.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="estimatedValue" className="block text-sm font-medium text-gray-700">
              Valor Estimado (R$)
            </label>
            <input
              type="number"
              id="estimatedValue"
              value={formData.estimatedValue}
              onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: Number(e.target.value) || 0 }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Prioridade
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="justification" className="block text-sm font-medium text-gray-700">
              Justificativa da Necessidade
            </label>
            <textarea
              id="justification"
              rows={4}
              value={formData.justification}
              onChange={(e) => setFormData(prev => ({ ...prev, justification: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="quantityJustification" className="block text-sm font-medium text-gray-700">
              Justificativa do Quantitativo
            </label>
            <textarea
              id="quantityJustification"
              rows={4}
              value={formData.quantityJustification}
              onChange={(e) => setFormData(prev => ({ ...prev, quantityJustification: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="deliveryLocation" className="block text-sm font-medium text-gray-700">
              Local de Entrega/Execução
            </label>
            <input
              type="text"
              id="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={(e) => setFormData(prev => ({ ...prev, deliveryLocation: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="deliveryDeadline" className="block text-sm font-medium text-gray-700">
              Prazo de Entrega/Execução
            </label>
            <input
              type="date"
              id="deliveryDeadline"
              value={formData.deliveryDeadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deliveryDeadline: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="supervisorId" className="block text-sm font-medium text-gray-700">
              Fiscal Responsável
            </label>
            <select
              id="supervisorId"
              value={formData.supervisorId}
              onChange={(e) => setFormData(prev => ({ ...prev, supervisorId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="">Selecione um fiscal</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="pt-5 px-6">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Demanda
          </button>
        </div>
      </div>
    </form>
  );
};

export default DemandForm;
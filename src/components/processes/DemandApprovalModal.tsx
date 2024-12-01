import React, { useState } from 'react';
import { X, Check, X as XIcon } from 'lucide-react';
import { Demand } from '../../types';

interface DemandApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  demand: Demand;
  onApprove: (comments: string) => void;
  onReject: (comments: string) => void;
}

const DemandApprovalModal: React.FC<DemandApprovalModalProps> = ({
  isOpen,
  onClose,
  demand,
  onApprove,
  onReject,
}) => {
  const [comments, setComments] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (action === 'approve') {
      onApprove(comments);
    } else if (action === 'reject') {
      onReject(comments);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Análise de Demanda
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {demand.object}
            </h3>
            <p className="text-sm text-gray-600">
              {demand.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                Comentários
              </label>
              <textarea
                id="comments"
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Adicione seus comentários sobre a decisão..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setAction('reject');
                  if (comments) handleSubmit(new Event('submit') as any);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XIcon className="h-4 w-4 mr-2" />
                Rejeitar
              </button>
              <button
                type="button"
                onClick={() => {
                  setAction('approve');
                  if (comments) handleSubmit(new Event('submit') as any);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Check className="h-4 w-4 mr-2" />
                Aprovar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemandApprovalModal;
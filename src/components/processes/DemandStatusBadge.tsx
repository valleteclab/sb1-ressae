import React from 'react';
import { Demand } from '../../types';

interface DemandStatusBadgeProps {
  status: Demand['status'];
}

const DemandStatusBadge: React.FC<DemandStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: Demand['status']) => {
    const configs = {
      draft: {
        label: 'Rascunho',
        className: 'bg-gray-100 text-gray-800'
      },
      pending_approval: {
        label: 'Aguardando Aprovação',
        className: 'bg-yellow-100 text-yellow-800'
      },
      approved: {
        label: 'Aprovada',
        className: 'bg-green-100 text-green-800'
      },
      rejected: {
        label: 'Rejeitada',
        className: 'bg-red-100 text-red-800'
      }
    };
    return configs[status];
  };

  const config = getStatusConfig(status);

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
};

export default DemandStatusBadge;
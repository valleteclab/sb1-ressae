import { firestoreService } from './firestore.service';
import { Demand, DemandApproval, DemandLog } from '../types';

const COLLECTION_NAME = 'demands';
const APPROVALS_COLLECTION = 'demandApprovals';
const LOGS_COLLECTION = 'demandLogs';

export const demandsService = {
  async createDemand(demandData: Omit<Demand, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return firestoreService.create(COLLECTION_NAME, {
      ...demandData,
      status: 'draft'
    });
  },

  async getDemands(): Promise<Demand[]> {
    const demands = await firestoreService.getAll(COLLECTION_NAME);
    return demands as Demand[];
  },

  async getDemandById(id: string): Promise<Demand | null> {
    const demand = await firestoreService.getById(COLLECTION_NAME, id);
    return demand as Demand | null;
  },

  async updateDemand(id: string, demandData: Partial<Demand>): Promise<void> {
    await firestoreService.update(COLLECTION_NAME, id, demandData);
  },

  async deleteDemand(id: string): Promise<void> {
    await firestoreService.delete(COLLECTION_NAME, id);
  },

  async submitForApproval(id: string, approverId: string): Promise<void> {
    await firestoreService.update(COLLECTION_NAME, id, { 
      status: 'pending_approval',
      currentApprover: approverId
    });

    await this.createApproval({
      demandId: id,
      approverId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    await this.addLog({
      demandId: id,
      action: 'created',
      description: 'Demand submitted for approval',
      createdAt: new Date().toISOString()
    });
  },

  async createApproval(approvalData: Omit<DemandApproval, 'id'>): Promise<string> {
    return firestoreService.create(APPROVALS_COLLECTION, approvalData);
  },

  async addLog(logData: Omit<DemandLog, 'id'>): Promise<string> {
    return firestoreService.create(LOGS_COLLECTION, logData);
  },

  async getDemandsByDepartment(departmentId: string): Promise<Demand[]> {
    const demands = await firestoreService.queryByField(COLLECTION_NAME, 'departmentId', departmentId);
    return demands as Demand[];
  },

  async getPendingApprovals(approverId: string): Promise<Demand[]> {
    const demands = await firestoreService.queryByField(COLLECTION_NAME, 'currentApprover', approverId);
    return demands.filter(demand => demand.status === 'pending_approval') as Demand[];
  }
};
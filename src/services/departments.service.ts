import { firestoreService } from './firestore.service';
import { Department } from '../types';

const COLLECTION_NAME = 'departments';

export const departmentsService = {
  async createDepartment(departmentData: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return firestoreService.create(COLLECTION_NAME, departmentData);
  },

  async getDepartments(): Promise<Department[]> {
    const departments = await firestoreService.getAll(COLLECTION_NAME);
    return departments as Department[];
  },

  async getDepartmentById(id: string): Promise<Department | null> {
    const department = await firestoreService.getById(COLLECTION_NAME, id);
    return department as Department | null;
  },

  async updateDepartment(id: string, departmentData: Partial<Department>): Promise<void> {
    await firestoreService.update(COLLECTION_NAME, id, departmentData);
  },

  async deleteDepartment(id: string): Promise<void> {
    await firestoreService.delete(COLLECTION_NAME, id);
  }
};
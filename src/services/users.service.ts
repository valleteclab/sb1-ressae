import { firestoreService } from './firestore.service';
import { User } from '../types';

const COLLECTION_NAME = 'users';

export const usersService = {
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return firestoreService.create(COLLECTION_NAME, userData);
  },

  async getUsers(): Promise<User[]> {
    const users = await firestoreService.getAll(COLLECTION_NAME);
    return users as User[];
  },

  async getUserById(id: string): Promise<User | null> {
    const user = await firestoreService.getById(COLLECTION_NAME, id);
    return user as User | null;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<void> {
    await firestoreService.update(COLLECTION_NAME, id, userData);
  },

  async deleteUser(id: string): Promise<void> {
    await firestoreService.delete(COLLECTION_NAME, id);
  },

  async getUsersByDepartment(departmentId: string): Promise<User[]> {
    const users = await firestoreService.queryByField(COLLECTION_NAME, 'departmentId', departmentId);
    return users as User[];
  }
};
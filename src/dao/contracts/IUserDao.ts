import { NewUser, User } from '@/src/db/schema/user';

export default interface IUserDao {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  findByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  isEmailExists(email: string): Promise<boolean>;
  createWithTransaction(user: NewUser, tx?: any): Promise<User>;
  create(user: NewUser): Promise<User>;
  updatePassword(userId: number): Promise<User | undefined>;
}

import { NewUser, User } from '@/src/db/schema/user';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';

export default interface IUserService {
  createUser: (user: NewUser) => Promise<ApiServiceResponse>;
  isEmailExists: (email: string) => Promise<ApiServiceResponse>;
  getUserById: (id: number) => Promise<ApiServiceResponse>;
  //   changePassword: (userId: number, newPassword: string) => Promise<ApiServiceResponse>;
}

import { NewUser, User } from '@/src/db/schema/user';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';

export default interface IAuthService {
  login(idToken: string): Promise<ApiServiceResponse>;
  register(user: NewUser): Promise<ApiServiceResponse>;
}

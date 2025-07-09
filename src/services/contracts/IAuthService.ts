import { NewUser, User } from '@/src/db/schema/user';

export default interface IAuthService {
  login(email: string, password: string): Promise<User>;
  register(user: NewUser): Promise<User>;
}

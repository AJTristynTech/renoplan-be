import { Contract, NewContract } from '@/src/db/schema/contracts';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';

export default interface IContractService {
  createContract(contract: NewContract): Promise<ApiServiceResponse>;
  getContractByProjectId(projectId: number): Promise<ApiServiceResponse>;
  getContractById(id: number): Promise<ApiServiceResponse>;
  updateContract(
    id: number,
    data: Partial<Contract>,
  ): Promise<ApiServiceResponse>;
}

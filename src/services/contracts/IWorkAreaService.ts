import { NewWorkArea, WorkArea } from '@/src/db/schema/work-areas';
import { ApiServiceResponse } from '@/src/types/apiServiceResponse';

export default interface IWorkAreaService {
  getWorkAreas(
    limit: number,
    offset: number,
    filter?: string,
  ): Promise<ApiServiceResponse>;
  getWorkAreasByScopeType(scopeType: string): Promise<ApiServiceResponse>;
  getWorkAreaById(id: number): Promise<ApiServiceResponse>;
  createWorkArea(workArea: NewWorkArea): Promise<ApiServiceResponse>;
  updateWorkArea(
    id: number,
    workArea: Partial<WorkArea>,
  ): Promise<ApiServiceResponse>;
}

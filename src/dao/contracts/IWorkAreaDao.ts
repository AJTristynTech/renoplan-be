import { Trade } from '@/src/db/schema/trades';
import { NewWorkArea, WorkArea } from '@/src/db/schema/work-areas';

export default interface IWorkAreaDao {
  getWorkAreas(limit: number, offset: number): Promise<WorkArea[]>;
  getWorkAreasByScopeType(scopeType: string): Promise<WorkArea[]>;
  getWorkAreaById(id: number): Promise<WorkArea | null>;
  createWorkArea(workArea: NewWorkArea): Promise<WorkArea>;
  updateWorkArea(id: number, workArea: Partial<WorkArea>): Promise<WorkArea>;
  addTradesToWorkArea(workAreaId: number, tradeIds: number[]): Promise<void>;
  getTradesForWorkArea(workAreaId: number): Promise<Trade[]>;
}

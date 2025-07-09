export default interface ISuperDao<T, TInsert = Partial<T>> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | undefined>;
  findOneByWhere(where: object): Promise<T | undefined>;
  findByWhere(where: object, limit?: number, offset?: number): Promise<T[]>;
  create(data: TInsert): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | undefined>;
  delete(id: number): Promise<boolean>;
  count(where?: object): Promise<number>;
}

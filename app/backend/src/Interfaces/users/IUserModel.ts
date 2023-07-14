import IUsers, { IUserResponse } from './IUsers';

export interface IUserModel {
  findAll(): Promise<IUserResponse[]>,
  findByPk(id: IUsers['id']): Promise<IUserResponse | null>
}

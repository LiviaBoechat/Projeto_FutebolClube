// import { NewEntity } from '../Interfaces/index';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import { IUserResponse } from '../Interfaces/users/IUsers';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IUserResponse[]>> {
    const allUsers = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: allUsers };
  }

  public async findById(id: number): Promise<ServiceResponse<IUserResponse>> {
    const user = await this.userModel.findByPk(id);
    if (!user) return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };
    return { status: 'SUCCESSFUL', data: user };
  }
}

import SequelizeUser from '../database/models/SequelizeUser';
import IUser, { IUserResponse } from '../Interfaces/users/IUsers';

export default class UserModel {
  private model = SequelizeUser;

  async findAll(): Promise<IUserResponse[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, username, role, email }) => (
      { id, username, role, email }
    ));
  }

  async findByPk(id: IUserResponse['id']): Promise<IUserResponse | null> {
    const user = await this.model.findByPk(id);
    if (!user) return null;
    const { username, role, email } = user;
    return { id, username, role, email };
  }

  async findOne(email: IUserResponse['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return !user ? null : user;
  }

  async findRole(id: IUserResponse['id']): Promise<IUserResponse['role'] | null> {
    console.log('IDDDDDDD', id);

    const user = await this.model.findByPk(id);
    if (!user) return null;
    const { role } = user;
    return role;
  }
}

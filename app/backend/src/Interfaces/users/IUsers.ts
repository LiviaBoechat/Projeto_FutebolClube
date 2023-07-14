export default interface IUsers {
  id: number,
  username: string;
  role: string;
  email: string;
  password: string;
}

// usuário a ser retornado pela API
export type IUserResponse = Omit<IUsers, 'password'>;

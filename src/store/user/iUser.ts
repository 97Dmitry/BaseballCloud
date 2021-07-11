export interface IUser {
  email: string;
  role: string;
  token: string | null;
  id: number | null;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IRegistration {
  email: string;
  password: string;
}

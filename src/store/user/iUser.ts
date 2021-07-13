export interface IUser {
  email: string;
  role: string;
  token: string | null;
  clientToken: string | null;
  id: number | null;
  loading?: boolean;
  errors?: string | null;
  authorized?: boolean;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IRegistration {
  email: string;
  password: string;
  password_confirmation: string;
}

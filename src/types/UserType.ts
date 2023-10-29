export type UserLogin = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: 'USER' | 'ADMIN';
  accessToken: string
}

export type User= {
  user:UserLogin,
  token:string,
}

export type UserByAccessToken = Omit<UserLogin, 'accessToken'> & {
  account: {
    role: 'USER' | 'ADMIN'
  }
}

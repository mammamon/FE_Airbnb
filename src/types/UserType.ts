export type UserLogin = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  accessToken: string
}

export type UserByAccessToken = Omit<UserLogin, 'accessToken'> & {
  account: {
    role: 'user' | 'admin'
  }
}

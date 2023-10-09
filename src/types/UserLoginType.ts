export type userLoginType = {
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    avatar: string;
    gender: boolean;
    role: 'USER'|'ADMIN';
  },
  token:string
};

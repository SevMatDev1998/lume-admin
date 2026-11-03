import ApiInstance from '../../api/api';
import ApiEnum from '../../enums/api.enum';
import { User } from '../../types';

const AuthService = ApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getInfo: build.query<User, void>({
      query: () => ({ url: ApiEnum.AUTH_ME }),
    }),
    login: build.mutation<{ accessToken: string; refreshToken: string }, { email: string; password: string }>({
      query: (body) => ({ url: ApiEnum.AUTH_LOGIN, method: 'POST', body }),
    }),
  }),
});

export const { useGetInfoQuery, useLoginMutation } = AuthService;
export const {
  endpoints: { login, getInfo },
} = AuthService;

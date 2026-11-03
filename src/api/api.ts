import { BaseQueryFn, createApi, fetchBaseQuery, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { clearTokens, getJwtToken, getRefreshToken, setJwtToken, setRefreshToken } from '../utils/tokenUtil.ts';
import { sessionExpired } from '../store/actions.ts';
import ApiEnum from '../enums/api.enum.ts';

type Envelope<T> = { success: boolean; data: T };
type Tokens = { accessToken: string; refreshToken: string };

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getJwtToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQuery: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, options) => {
  const result = await rawBaseQuery(args, api, options);
  if (result.data && typeof result.data === 'object' && 'success' in result.data) {
    return { ...result, data: (result.data as Envelope<unknown>).data };
  }
  return result;
};

const refreshTokens = async (...[, api, options]: Parameters<typeof baseQuery>) => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const { data } = await baseQuery({ url: ApiEnum.AUTH_REFRESH, method: 'POST', body: { refreshToken } }, api, options);
  if (!data) return false;

  setJwtToken((data as Tokens).accessToken);
  setRefreshToken((data as Tokens).refreshToken);
  return true;
};

export const baseQueryInstance: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, options) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, options);
  if (result.error?.status !== 401 || args.url === ApiEnum.AUTH_LOGIN) return result;

  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
    return baseQuery(args, api, options);
  }

  const release = await mutex.acquire();
  try {
    if (await refreshTokens(args, api, options)) {
      result = await baseQuery(args, api, options);
    }
    if (result.error?.status === 401) {
      clearTokens();
      api.dispatch(sessionExpired());
    }
  } finally {
    release();
  }
  return result;
};

export const errorMessage = (error: unknown, fallback = 'Something went wrong') => {
  const message = (error as { data?: { message?: string | string[] } })?.data?.message;
  return Array.isArray(message) ? message.join(', ') : message || fallback;
};

const ApiInstance = createApi({
  reducerPath: 'api-instance',
  baseQuery: baseQueryInstance,
  tagTypes: ['Dashboard', 'Inquiry', 'Booking', 'Product', 'Category', 'User'],
  endpoints: () => ({}),
});

export default ApiInstance;

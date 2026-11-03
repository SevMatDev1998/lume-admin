import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import { getInfo, login } from '../../services/auth/auth.service';
import { clearTokens, setJwtToken, setRefreshToken } from '../../utils/tokenUtil';
import { sessionExpired } from '../actions';

interface IAuthState {
  user: User | null;
}

const initialState: IAuthState = {
  user: null,
};

export const isAdmin = (user: User | null) => user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logOut: () => {
      clearTokens();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sessionExpired, () => initialState);
    builder.addMatcher(login.matchFulfilled, (_state, { payload }) => {
      setJwtToken(payload.accessToken);
      setRefreshToken(payload.refreshToken);
    });
    builder.addMatcher(getInfo.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;

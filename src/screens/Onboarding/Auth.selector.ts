import { RootState } from '../../stores/Store';

export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthMobile = (state: RootState) => state.auth.mobile;

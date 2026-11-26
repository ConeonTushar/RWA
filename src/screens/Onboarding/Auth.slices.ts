import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from './Auth.types';
import { AUTH_API_URLS } from './Auth.constants';
import { postData, putData, deleteData } from '../../services/httpServices';
import asyncStorageService from '../../services/asyncStorage';
import { RWA_USER_TOKEN_KEY } from '../../utils/constants';

const initialState: AuthState = {
  loading: false,
  error: null,
  token: null,
  mobile: '',
};

export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (mobile: string, { rejectWithValue }) => {
    try {
      const result: any = await postData({
        url: AUTH_API_URLS.SEND_OTP,
        body: { mobile },
        allowCallWithoutToken: true,
      });

      if (typeof result === 'string') return rejectWithValue(result);
      if (!result?.status) {
        return rejectWithValue(result?.message || 'Error sending OTP');
      }
      return { mobile, data: result.data || result };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (mobile: string, { rejectWithValue }) => {
    try {
      const result: any = await postData({
        url: AUTH_API_URLS.RESEND_OTP,
        body: { mobile },
        allowCallWithoutToken: true,
      });
      if (typeof result === 'string') return rejectWithValue(result);
      if (!result?.status) {
        return rejectWithValue(result?.message || 'Error resending OTP');
      }
      return { mobile, data: result.data || result };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (
    { mobile, otp }: { mobile: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      const result: any = await postData({
        url: AUTH_API_URLS.VERIFY_OTP,
        body: { mobile, otp },
        allowCallWithoutToken: true,
      });
      if (typeof result === 'string') return rejectWithValue(result);
      if (!result?.status) {
        return rejectWithValue(result?.message || 'Error verifying OTP');
      }
      const token =
        result?.data?.token ||
        result?.data?.access_token ||
        result?.token ||
        null;
      if (token) {
        await asyncStorageService.saveItem(RWA_USER_TOKEN_KEY, token);
      }
      return { token, data: result.data || result };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const result: any = await putData({
        url: AUTH_API_URLS.SIGNUP,
        body: userData,
        allowCallWithoutToken: false,
      });
      if (typeof result === 'string') return rejectWithValue(result);
      if (!result?.status) {
        return rejectWithValue(result?.message || 'Error registering user');
      }
      return result.data || result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const result: any = await deleteData({
        url: AUTH_API_URLS.LOGOUT,
        allowCallWithoutToken: false,
      });
      if (typeof result === 'string') return rejectWithValue(result);
      if (!result?.status) {
        return rejectWithValue(result?.message || 'Error logging out');
      }
      await asyncStorageService.removeItem(RWA_USER_TOKEN_KEY);
      return result.data || result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: state => {
      state.error = null;
    },
    logout: state => {
      state.token = null;
      state.mobile = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.mobile = action.payload.mobile;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(resendOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false;
        state.token = null;
        state.mobile = '';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;

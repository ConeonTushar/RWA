export interface AuthState {
  loading: boolean;
  error: string | null;
  token: string | null;
  mobile: string;
}

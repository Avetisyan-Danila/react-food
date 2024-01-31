import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage.ts";
import { LoginResponse } from "../interfaces/auth.interface.ts";
import { PREFIX } from "../helpers/API.ts";
import { Profile } from "../interfaces/user.interface.ts";
import { RootState } from "./store.ts";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  profile?: Profile;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });

      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  },
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  "user/getProfile",
  async (_, thunkAPI) => {
    const jwt = thunkAPI.getState().user.jwt;
    const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return data;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }

      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;

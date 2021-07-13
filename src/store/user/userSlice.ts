import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, IRegistration, IUser } from "./iUser";

const initialState: IUser = {
  token: null,
  email: "",
  clientToken: null,
  id: null,
  role: "",
  loading: false,
  errors: null,
  authorized: false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorization: (state, action: PayloadAction<IAuth>) => {},
    registration: (state, action: PayloadAction<IRegistration>) => {},
    setUser: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setErrors: (state, action: PayloadAction<string | null>) => {
      return { ...state, errors: action.payload };
    },
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      return { ...state, authorized: action.payload };
    },
    removeUser: () => {
      return { ...initialState };
    },
  },
});

export default userSlice.reducer;
export const {
  authorization,
  setUser,
  registration,
  removeUser,
  setLoading,
  setErrors,
  setAuthorized,
} = userSlice.actions;

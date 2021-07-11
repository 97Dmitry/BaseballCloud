import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, IRegistration, IUser } from "./iUser";

const initialState: IUser = {
  token: null,
  email: "",
  id: null,
  role: "",
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
    removeUser: () => {
      return { ...initialState };
    },
  },
});

export default userSlice.reducer;
export const { authorization, setUser, registration, removeUser } =
  userSlice.actions;

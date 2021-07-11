import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { singIn, singUp } from "api/userApi";
import { setUser } from "store/user/userSlice";

export function* handleSingIn(
  action: PayloadAction<{
    email: string;
    password: string;
  }>
): any {
  try {
    const response = yield call(singIn, { ...action.payload });
    const data = response.data.data;
    yield put(
      setUser({
        token: response.headers["access-token"],
        email: data.email,
        id: data.id,
        role: data.role,
      })
    );
  } catch (e) {
    console.log(e);
  }
}

export function* handleSingUp(
  action: PayloadAction<{ email: string; password: string }>
): any {
  try {
    const response = yield call(singUp, { ...action.payload });
    yield put(
      setUser({
        token: response.header["access-token"],
        email: response.data.email,
        id: response.data.id,
        role: response.data.role,
      })
    );
  } catch (e) {
    console.log(e);
  }
}

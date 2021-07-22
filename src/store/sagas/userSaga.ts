import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { singIn, singUp } from "api/userApi";
import {
  setAuthorized,
  setErrors,
  setLoading,
  setUser,
} from "store/user/userSlice";

export function* handleSingIn(
  action: PayloadAction<{
    email: string;
    password: string;
  }>
): any {
  try {
    yield put(setErrors(null));
    yield put(setLoading(true));
    const response = yield call(singIn, { ...action.payload });
    const data = response.data.data;

    yield put(
      setUser({
        token: response.headers["access-token"],
        clientToken: response.headers.client,
        email: data.email,
        id: data.id,
        role: data.role,
      })
    );
    yield put(setLoading(false));
    yield put(setAuthorized(true));
  } catch (e) {
    yield put(setLoading(false));
    yield put(setErrors(e.error));
  }
}

export function* handleSingUp(
  action: PayloadAction<{
    email: string;
    password: string;
    password_confirmation: string;
  }>
): any {
  try {
    console.log("qwe");

    yield put(setErrors(null));
    yield put(setLoading(true));
    const response = yield call(singUp, { ...action.payload });
    yield put(
      setUser({
        token: response.header["access-token"],
        email: response.data.email,
        clientToken: response.headers.client,
        id: response.data.id,
        role: response.data.role,
      })
    );
    yield put(setLoading(false));
    console.log("asd");

    yield put(setAuthorized(true));
  } catch (e) {
    yield put(setLoading(false));
    yield put(setErrors(e.error));
  }
}

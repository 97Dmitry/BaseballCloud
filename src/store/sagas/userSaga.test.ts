import { put, take } from "redux-saga/effects";
import { handleSingIn } from "./userSaga";

test("user sing in saga", () => {
  const singIn = handleSingIn({
    payload: { email: "123", password: "123" },
    type: "",
  });
});

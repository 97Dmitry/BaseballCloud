import { IUser } from "./iUser";
import reducer, { setUser, removeUser } from "./userSlice";

let initialState: IUser;

beforeEach(() => {
  initialState = {
    token: null,
    email: "",
    clientToken: null,
    id: null,
    role: "",
    loading: false,
    errors: null,
    authorized: false,
  };
});

test("setUser must update state", () => {
  expect(
    reducer(
      initialState,
      setUser({
        token: "123456789",
        email: "email@email.com",
        clientToken: "qwerty",
        id: 1,
        role: "Admin",
        loading: false,
        errors: null,
        authorized: true,
      })
    )
  ).toEqual({
    token: "123456789",
    email: "email@email.com",
    clientToken: "qwerty",
    id: 1,
    role: "Admin",
    loading: false,
    errors: null,
    authorized: true,
  });
});

test("logout user", () => {
  expect(reducer(initialState, removeUser())).toEqual(initialState);
});

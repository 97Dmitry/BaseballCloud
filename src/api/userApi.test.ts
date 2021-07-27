import { singIn } from "./userApi";

test("user auth test", async () => {
  const response = await singIn({
    email: "test@example.com",
    password: "12345678",
  });

  expect(response.status).toBe(200);
});

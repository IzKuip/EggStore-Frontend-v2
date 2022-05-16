import { egTokenKey, isLoggedIn } from "../env";
import { apiReq } from "./main";

export async function login(auth?: Credentials): Promise<boolean> {
  console.log(
    `API: Auth: Login: logging in ${
      auth ? "using provided authentication" : "from localStorage"
    }`
  );

  const token = auth
    ? btoa(`${auth.username}:${auth.password}`)
    : localStorage.getItem(egTokenKey);

  if (token) {
    const req = await apiReq("auth/check", {}, token);

    console.log(token);
    localStorage.setItem(egTokenKey, token);
    isLoggedIn.set(req.valid);

    console.log(
      `API: Auth: Login: Authentication ${req.valid ? "succeeded" : "failed!"}`,req,token
    );

    return req.valid;
  } else return false;
}

export async function logout() {
  isLoggedIn.set(false);
  localStorage.setItem(egTokenKey, null);
}

export interface Credentials {
  username: string;
  password: string;
}

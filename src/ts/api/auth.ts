import { egTokenKey, isLoggedIn } from "../env";
import { log } from "../logs/main";
import { apiReq } from "./main";

export async function login(auth?: Credentials): Promise<boolean> {
  console.log(
    `API: Auth: Login: logging in ${
      auth ? "using provided authentication" : "from localStorage"
    }`
  );

  log(
    "Login",
    "Aanmelden",
    `Bezig met aanmelden via ${auth ? "inloggegevens" : "opgeslagen gegevens"}`
  );

  const token = auth
    ? btoa(`${auth.username}:${auth.password}`)
    : localStorage.getItem(egTokenKey);

  if (token) {
    const req = await apiReq("auth/check", {}, token);

    localStorage.setItem(egTokenKey, token);
    isLoggedIn.set(req.valid);

    console.log(
      `API: Auth: Login: Authentication ${req.valid ? "succeeded" : "failed!"}`
    );

    return req.valid;
  } else return false;
}

export async function logout() {
  log(
    "Logout",
    "Bezig met afmelden...",
    `${egTokenKey} verwijderen voor afmelding...`
  );
  isLoggedIn.set(false);
  localStorage.removeItem(egTokenKey);
}

export interface Credentials {
  username: string;
  password: string;
}

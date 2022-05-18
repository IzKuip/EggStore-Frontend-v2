import { egTokenKey, isLoggedIn } from "../env";
import { log } from "../logs/main";
import { apiReq } from "./main";

export async function login(auth?: Credentials): Promise<boolean> {
  log(
    "Login",
    "Aanmelding",
    `Bezig met aanmelden via ${auth ? "inloggegevens" : "opgeslagen gegevens"}`
  );

  const token = auth
    ? btoa(`${auth.username}:${auth.password}`)
    : localStorage.getItem(egTokenKey);

  if (token) {
    const req = await apiReq("auth/check", {}, token);

    localStorage.setItem(egTokenKey, token);
    isLoggedIn.set(req.valid);

    return req.valid;
  } else return false;
}

export async function logout() {
  log(
    "Logout",
    "Afmelding",
    `${egTokenKey} verwijderen voor afmelding...`
  );

  isLoggedIn.set(false);
  
  localStorage.removeItem(egTokenKey);
}

export interface Credentials {
  username: string;
  password: string;
}

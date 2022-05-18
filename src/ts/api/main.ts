import { EggApiServ } from "../env";
import { log } from "../logs/main";
import type { Credentials } from "./auth";

export async function apiReq(
  path: string,
  params: { [key: string]: any },
  auth?: string | Credentials
): Promise<{
  valid: boolean;
  data: object;
}> {
  log("APIReq","Aanvraag",`Er is een server aanvraag gemaakt naar ${path}.`);
  const init: RequestInit = {
    headers: {
      Authorization: `Basic ${
        auth
          ? typeof auth == "string"
            ? auth
            : btoa(`${auth.username}:${auth.password}`)
          : ""
      }`,
    },
  };

  let paramStr = "?";
  for (const key in params) {
    paramStr += `${key}=${params[key]}&`;
  }

  const response = await (
    await fetch(`${EggApiServ}/${path}${paramStr}`, auth ? init : {})
  ).json();

  return {
    valid: response.valid,
    data: response.response,
  };
}
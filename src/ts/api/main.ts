import { EggApiServ } from "../env";
import { log } from "../logs/main";
import type { Credentials } from "./auth";
import fetch from "../fetch";
import { showConfirmation } from "../confirmation/main";

export async function apiReq(
  path: string,
  params: { [key: string]: any },
  auth?: string | Credentials
): Promise<{
  valid: boolean;
  data: object;
}> {
  log("APIReq", "Aanvraag", `Er is een server aanvraag gemaakt naar ${path}.`);
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

  try {
    const response = await (
      await fetch(`${EggApiServ}/${path}${paramStr}`, auth ? init : {}, 3000)
    ).json();

    return {
      valid: response.valid,
      data: response.response,
    };
  } catch {
    showConfirmation({
      title: "Verbindingsfout",
      message:
        "Er kon geen verbinding worden gemaakt met de Reggistry. Probeer het later opnieuw.",
      okButton: {
        capt: "Sluiten",
        icon: "close",
        event: () => {
        },
      },
    });

    return {
      valid: false,
      data: undefined,
    };
  }
}

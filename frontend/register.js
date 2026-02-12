const API_BASE = "http://localhost:5000";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById("error").textContent = data.error || "Registration failed";
      return;
    }

    alert("Account created successfully!");
    window.location.href = "login.html";

  } catch (err) {
    console.error(err);
    document.getElementById("error").textContent = "Server error";
  }
});

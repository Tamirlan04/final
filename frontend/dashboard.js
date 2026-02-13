const API_BASE = "https://final-k9uk.onrender.com";
const token = localStorage.getItem("token");

// если не авторизован → обратно на login
if (!token) {
  window.location.href = "login.html";
}

// logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// загрузка заказов
async function loadOrders() {
  try {
    const res = await fetch(`${API_BASE}/api/orders/my`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();

    const list = document.getElementById("ordersList");
    list.innerHTML = "";

    data.forEach(order => {
      const li = document.createElement("li");
      li.textContent = order.type + " — " + order.deadline;
      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
  }
}

loadOrders();

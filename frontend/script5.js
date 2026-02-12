// theme toggle (оставил как у тебя)
const themeButton = document.getElementById('themeToggle');
const root = document.documentElement;
const logoText = document.querySelector('.brand span');
const logoImg = document.querySelector('.brand img');

if (localStorage.getItem('theme') === 'light') {
  setLightTheme(false);
} else {
  setDarkTheme(false);
}

themeButton.addEventListener('click', () => {
  if (root.classList.contains('light-mode')) setDarkTheme(true);
  else setLightTheme(true);
});

function setLightTheme(animate = true) {
  root.classList.add('light-mode');
  localStorage.setItem('theme', 'light');
  themeButton.textContent = 'Change Mode';

  root.style.setProperty('--bg', '#f8fafc');
  root.style.setProperty('--panel', '#ffffff');
  root.style.setProperty('--glass', 'rgba(255,255,255,0.75)');
  root.style.setProperty('--border', 'rgba(0,0,0,0.1)');
  root.style.setProperty('--text', '#111827');
  root.style.setProperty('--muted', '#475569');
  root.style.setProperty('--accent', '#0ea5e9');
  root.style.setProperty('--accent-2', '#0284c7');

  if (logoText) logoText.style.color = '#0f172a';
  if (logoImg) logoImg.style.filter = 'invert(1) brightness(0.1) contrast(1.2)';

  if (animate) fadeTransition?.();
}

function setDarkTheme(animate = true) {
  root.classList.remove('light-mode');
  localStorage.setItem('theme', 'dark');
  themeButton.textContent = 'Change Mode';

  root.style.setProperty('--bg', '#0f172a');
  root.style.setProperty('--panel', '#111827');
  root.style.setProperty('--glass', 'rgba(17,24,39,0.55)');
  root.style.setProperty('--border', 'rgba(255,255,255,0.08)');
  root.style.setProperty('--text', '#e5e7eb');
  root.style.setProperty('--muted', '#94a3b8');
  root.style.setProperty('--accent', '#22d3ee');
  root.style.setProperty('--accent-2', '#06b6d4');

  if (logoText) logoText.style.color = '#e5e7eb';
  if (logoImg) logoImg.style.filter = 'none';

  if (animate) fadeTransition?.();
}

// ---------- orders -> BACKEND (MongoDB) ----------
$(document).ready(function () {
  const API_BASE = 'http://localhost:5000';

  $('#orderForm').on('submit', async function (e) {
    e.preventDefault();

    // собрали данные из формы
    const order = {
      name: $('#name').val().trim(),
      phone: $('#phone').val().trim(),
      type: $('#type').val(),
      deadline: $('#deadline').val(), // строка YYYY-MM-DD (сервер сам превратит в Date)
      designFileName: $('#design').val().split('\\').pop() // только имя файла
    };

    // простая проверка на фронте (на всякий)
    if (!order.name || !order.phone || !order.type || !order.deadline) {
      $('#orderResponse').text('Please fill all required fields.');
      return;
    }

    // UI: блокируем кнопку, чтобы не спамили
    const btn = $('#submitOrder');
    btn.prop('disabled', true).text('Sending...');

    try {   
      console.log("TOKEN:", localStorage.getItem("token"));
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(order)
      });

      const data = await res.json();

      if (!res.ok) {
        $('#orderResponse').text(data.error || 'Error while saving order');
        return;
      }

      if (res.ok) {
        alert("Order created!");
        window.location.href = "dashboard.html";
      }

      alert("Your order has been submitted! We’ll contact you soon. ✅");
      $('#orderResponse').text('Saved in DB. ID: ' + data._id);
      $('#orderForm')[0].reset();

      console.log('Saved order:', data);
    } catch (err) {
      console.error(err);
      $('#orderResponse').text('Server is not reachable. Start backend on port 5000.');
    } finally {
      btn.prop('disabled', false).text('Submit Order');
    }
  });
});

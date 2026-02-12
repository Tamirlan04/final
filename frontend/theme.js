
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
  if (root.classList.contains('light-mode')) {
    setDarkTheme(true);
  } else {
    setLightTheme(true);
  }
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

  if (animate) fadeTransition();
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

  if (animate) fadeTransition();
}
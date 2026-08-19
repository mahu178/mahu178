const themeMode = document.getElementById('theme-mode');
const htmlElement = document.documentElement;

// Load saved theme or default to 'auto'
const savedTheme = localStorage.getItem('theme') || 'auto';
themeMode.value = savedTheme;
applyTheme(savedTheme);

themeMode.addEventListener('change', (e) => {
    const theme = e.target.value;
    localStorage.setItem('theme', theme);
    applyTheme(theme);
});

function applyTheme(theme) {
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        htmlElement.setAttribute('data-theme', theme);
    }
}
const themeMode = document.getElementById('theme-mode');
const htmlElement = document.documentElement;

// Load saved theme or default to 'auto'
const savedTheme = localStorage.getItem('theme') || 'auto';
themeMode.value = savedTheme;
applyTheme(savedTheme);

themeMode.addEventListener('change', (e) => {
    const theme = e.target.value;
    localStorage.setItem('theme', theme);
    applyTheme(theme);
});

function applyTheme(theme) {
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        htmlElement.setAttribute('data-theme', theme);
    }
}
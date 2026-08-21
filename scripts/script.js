const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('site-menu');
const themeButton = document.getElementById('theme-mode');
const themes = ['auto', 'light', 'dark'];
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

let themeIndex = themes.indexOf(localStorage.getItem('theme'));
if (themeIndex < 0) themeIndex = 0;

function setTheme() {
    const selectedTheme = themes[themeIndex];
    const theme = selectedTheme === 'auto'
        ? (systemTheme.matches ? 'dark' : 'light')
        : selectedTheme;

    document.documentElement.dataset.theme = theme;

    themeButton.textContent =
        `Theme: ${selectedTheme[0].toUpperCase()}${selectedTheme.slice(1)}`;
    themeButton.setAttribute('aria-label', `Theme: ${selectedTheme}`);

    localStorage.setItem('theme', selectedTheme);
}

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
        menu.hidden = isOpen;
    });
}

themeButton.addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % themes.length;
    setTheme();
});

systemTheme.addEventListener('change', () => {
    if (themes[themeIndex] === 'auto') {
        setTheme();
    }
});

setTheme();
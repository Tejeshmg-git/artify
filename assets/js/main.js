/* 
    Artify - Main JS
    Handles: Theme Toggle, RTL Toggle, Header Effects
*/

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const rtlToggle = document.getElementById('rtl-toggle');
    const html = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem('artify-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Check saved RTL
    const savedRTL = localStorage.getItem('artify-rtl') === 'true';
    if (savedRTL) {
        html.setAttribute('dir', 'rtl');
    }

    // Theme Toggle Logic
    const handleThemeToggle = () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('artify-theme', newTheme);
        updateThemeIcon(newTheme);
    };

    if (themeToggle) themeToggle.addEventListener('click', handleThemeToggle);
    const drawerThemeToggle = document.getElementById('drawer-theme-toggle');
    if (drawerThemeToggle) drawerThemeToggle.addEventListener('click', handleThemeToggle);

    // RTL Toggle Logic
    const updateRTLText = (isRTL) => {
        const rtlToggleText = document.getElementById('rtl-toggle-text');
        if (rtlToggleText) {
            rtlToggleText.textContent = isRTL ? 'LTR' : 'RTL';
        }
        const drawerRTLToggleSpan = document.querySelector('#drawer-rtl-toggle span');
        if (drawerRTLToggleSpan) {
            drawerRTLToggleSpan.textContent = isRTL ? 'LTR' : 'RTL';
        }
        const drawerRTLToggleIcon = document.querySelector('#drawer-rtl-toggle i, #drawer-rtl-toggle svg');
        if (drawerRTLToggleIcon) {
            const iconName = isRTL ? 'align-right' : 'align-left';
            drawerRTLToggleIcon.setAttribute('data-lucide', iconName);
            if (drawerRTLToggleIcon.tagName.toLowerCase() === 'svg') {
                const newIcon = document.createElement('i');
                newIcon.setAttribute('data-lucide', iconName);
                drawerRTLToggleIcon.parentNode.replaceChild(newIcon, drawerRTLToggleIcon);
            }
            if (typeof lucide !== 'undefined') {
                lucide.createIcons({ icons: lucide.icons });
            }
        }
    };

    const handleRTLToggle = () => {
        const isRTL = html.getAttribute('dir') === 'rtl';
        if (isRTL) {
            html.removeAttribute('dir');
            localStorage.setItem('artify-rtl', 'false');
            updateRTLText(false);
        } else {
            html.setAttribute('dir', 'rtl');
            localStorage.setItem('artify-rtl', 'true');
            updateRTLText(true);
        }
    };

    if (savedRTL) {
        updateRTLText(true);
    } else {
        updateRTLText(false);
    }

    if (rtlToggle) rtlToggle.addEventListener('click', handleRTLToggle);
    const drawerRTLToggle = document.getElementById('drawer-rtl-toggle');
    if (drawerRTLToggle) drawerRTLToggle.addEventListener('click', handleRTLToggle);


    // Header Shadow on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    function updateThemeIcon(theme) {
        const themeIcons = document.querySelectorAll('#theme-toggle i, #theme-toggle svg, #drawer-theme-toggle i, #drawer-theme-toggle svg');
        themeIcons.forEach(iconEl => {
            const iconName = theme === 'light' ? 'moon' : 'sun';
            iconEl.setAttribute('data-lucide', iconName);
            if (iconEl.tagName.toLowerCase() === 'svg') {
                const newIcon = document.createElement('i');
                newIcon.setAttribute('data-lucide', iconName);
                iconEl.parentNode.replaceChild(newIcon, iconEl);
            }
        });
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({
                icons: lucide.icons
            });
        }
    }

    // Mobile Menu Toggle logic
    const mobileDrawer = document.getElementById('mobile-drawer');
    const menuOpenBtn = document.getElementById('mobile-menu-open');
    const menuCloseBtn = document.getElementById('mobile-menu-close');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (menuOpenBtn && mobileDrawer) {
        menuOpenBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuCloseBtn && mobileDrawer) {
        menuCloseBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Initialize Lucide Icons
    const initIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({
                icons: lucide.icons
            });
        }
    };

    initIcons();
});

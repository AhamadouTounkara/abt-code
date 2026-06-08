// ═══════════════════════════════════════════════════════════
// ABT CODE — SYSTÈME DE THÈMES GLOBAL
// Ce fichier doit être inclus dans TOUTES les pages du site
// ═══════════════════════════════════════════════════════════

const ABT_THEMES = {
    dark: {
        name:"Sombre (Défaut)", icon:"🌙",
        "--bg":"#0d0f14","--bg2":"#141720","--bg3":"#1c2030","--border":"#2a2f45",
        "--text":"#e2e8f0","--muted":"#64748b","--accent":"#4f8ef7","--accent2":"#a78bfa",
        "--card-bg":"#141720","--card-border":"#2a2f45","--header-bg":"#0d0f14",
        "--btn-bg":"#1c2030","--btn-text":"#64748b"
    },
    ocean: {
        name:"Océan Bleu", icon:"🌊",
        "--bg":"#0a1628","--bg2":"#0d2040","--bg3":"#112952","--border":"#1e3a6e",
        "--text":"#e0f2fe","--muted":"#7cb9e8","--accent":"#38bdf8","--accent2":"#818cf8",
        "--card-bg":"#0d2040","--card-border":"#1e3a6e","--header-bg":"#071020",
        "--btn-bg":"#112952","--btn-text":"#7cb9e8"
    },
    forest: {
        name:"Forêt Verte", icon:"🌿",
        "--bg":"#0a1a0f","--bg2":"#0d2015","--bg3":"#122b1a","--border":"#1a4027",
        "--text":"#d1fae5","--muted":"#6ee7b7","--accent":"#34d399","--accent2":"#a3e635",
        "--card-bg":"#0d2015","--card-border":"#1a4027","--header-bg":"#061009",
        "--btn-bg":"#122b1a","--btn-text":"#6ee7b7"
    },
    sunset: {
        name:"Coucher de Soleil", icon:"🌅",
        "--bg":"#1a0a00","--bg2":"#2a1200","--bg3":"#3a1a00","--border":"#5a2d00",
        "--text":"#fef3c7","--muted":"#fbbf24","--accent":"#f59e0b","--accent2":"#f97316",
        "--card-bg":"#2a1200","--card-border":"#5a2d00","--header-bg":"#0f0600",
        "--btn-bg":"#3a1a00","--btn-text":"#fbbf24"
    },
    purple: {
        name:"Galaxie Violette", icon:"🔮",
        "--bg":"#120a1e","--bg2":"#1c1030","--bg3":"#251540","--border":"#3d2060",
        "--text":"#ede9fe","--muted":"#a78bfa","--accent":"#8b5cf6","--accent2":"#ec4899",
        "--card-bg":"#1c1030","--card-border":"#3d2060","--header-bg":"#0a0612",
        "--btn-bg":"#251540","--btn-text":"#a78bfa"
    },
    rose: {
        name:"Rose Élégant", icon:"🌸",
        "--bg":"#1a0a10","--bg2":"#2a1020","--bg3":"#3a1530","--border":"#6b2045",
        "--text":"#fce7f3","--muted":"#f9a8d4","--accent":"#f472b6","--accent2":"#fb7185",
        "--card-bg":"#2a1020","--card-border":"#6b2045","--header-bg":"#0f0608",
        "--btn-bg":"#3a1530","--btn-text":"#f9a8d4"
    },
    light: {
        name:"Clair (Jour)", icon:"☀️",
        "--bg":"#f8fafc","--bg2":"#ffffff","--bg3":"#f1f5f9","--border":"#e2e8f0",
        "--text":"#1e293b","--muted":"#64748b","--accent":"#3b82f6","--accent2":"#8b5cf6",
        "--card-bg":"#ffffff","--card-border":"#e2e8f0","--header-bg":"#1e293b",
        "--btn-bg":"#f1f5f9","--btn-text":"#64748b"
    },
    contrast: {
        name:"Contraste Élevé", icon:"⚡",
        "--bg":"#000000","--bg2":"#111111","--bg3":"#1a1a1a","--border":"#333333",
        "--text":"#ffffff","--muted":"#aaaaaa","--accent":"#ffff00","--accent2":"#00ffff",
        "--card-bg":"#111111","--card-border":"#444444","--header-bg":"#000000",
        "--btn-bg":"#1a1a1a","--btn-text":"#aaaaaa"
    }
};

// Applique le thème sur toutes les CSS variables
function abtApplyTheme(themeId) {
    const theme = ABT_THEMES[themeId];
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, val]) => {
        if (key.startsWith('--')) root.style.setProperty(key, val);
    });
    localStorage.setItem('abt_theme', themeId);
}

// Charge le thème sauvegardé au démarrage
function abtLoadTheme() {
    const saved = localStorage.getItem('abt_theme') || 'dark';
    abtApplyTheme(saved);
}

// Bouton flottant désactivé
function abtInjectThemeBtn() { /* désactivé */ }

// Applique aussi taille police et espacement au chargement
function abtLoadPrefs() {
    abtLoadTheme();
    // Police
    const fs = parseInt(localStorage.getItem('abt_font_size') || '16');
    if (fs !== 16) document.body && (document.body.style.fontSize = fs + 'px');
    // Espacement
    const lh = localStorage.getItem('abt_line_height') || '1.6';
    if (lh !== '1.6') document.body && (document.body.style.lineHeight = lh);
    // Direction langue
    const lang = localStorage.getItem('abt_lang') || 'fr';
    document.documentElement && (document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement && (document.documentElement.lang = lang);
}

// Exécution automatique
abtLoadPrefs();
document.addEventListener('DOMContentLoaded', () => {
    abtLoadTheme();
    // // abtInjectThemeBtn() désactivé // désactivé
});
if (document.readyState !== 'loading') {
    // // abtInjectThemeBtn() désactivé // désactivé
}

(function() {
    'use strict';
    
    // Language configuration - support both /en/ and book-en/ paths
    const languages = {
        'en': {
            name: 'English',
            pathPrefix: 'en',
            dirName: 'book-en'
        },
        'zh-CN': {
            name: '中文',
            pathPrefix: 'zh',
            dirName: 'book-zh'
        }
    };
    
    // Detect current language and path mode
    function detectLanguageAndMode() {
        const htmlLang = document.documentElement.lang || 'en';
        const pathname = window.location.pathname;
        const segments = pathname.split('/').filter(Boolean);
        
        // Check for book-en or book-zh directory (development mode)
        const bookEnIndex = segments.indexOf('book-en');
        const bookZhIndex = segments.indexOf('book-zh');
        if (bookEnIndex !== -1) {
            return { lang: 'en', mode: 'dir', index: bookEnIndex };
        }
        if (bookZhIndex !== -1) {
            return { lang: 'zh-CN', mode: 'dir', index: bookZhIndex };
        }
        
        // Check for /en/ or /zh/ path (production mode)
        const enIndex = segments.indexOf('en');
        const zhIndex = segments.indexOf('zh');
        if (enIndex !== -1 && (zhIndex === -1 || enIndex < zhIndex)) {
            return { lang: 'en', mode: 'path', index: enIndex };
        }
        if (zhIndex !== -1) {
            return { lang: 'zh-CN', mode: 'path', index: zhIndex };
        }
        
        // Fallback to HTML lang attribute
        const lang = htmlLang === 'zh-CN' || htmlLang === 'zh' ? 'zh-CN' : 'en';
        return { lang: lang, mode: 'path', index: -1 };
    }
    
    // Get current language
    function getCurrentLanguage() {
        return detectLanguageAndMode().lang;
    }
    
    // Get current page path without language prefix
    function getCurrentPath() {
        const pathname = window.location.pathname;
        const { mode, index } = detectLanguageAndMode();
        
        if (index === -1) {
            // No language prefix found, return as is
            return pathname;
        }
        
        const segments = pathname.split('/').filter(Boolean);
        // Remove the language segment
        segments.splice(index, 1);
        return '/' + segments.join('/');
    }
    
    // Switch to another language
    function switchLanguage(targetLang) {
        const targetLangConfig = languages[targetLang];
        if (!targetLangConfig) {
            console.error('Unknown language:', targetLang);
            return;
        }
        
        const { mode } = detectLanguageAndMode();
        const currentPath = getCurrentPath();
        const segments = currentPath.split('/').filter(Boolean);
        
        let newPath;
        if (mode === 'dir') {
            // Development mode: book-en/ -> book-zh/
            const currentSegments = window.location.pathname.split('/').filter(Boolean);
            const langIndex = currentSegments.findIndex(s => s === 'book-en' || s === 'book-zh');
            if (langIndex !== -1) {
                currentSegments[langIndex] = targetLangConfig.dirName;
                newPath = '/' + currentSegments.join('/');
            } else {
                // Fallback: prepend the directory name
                newPath = '/' + targetLangConfig.dirName + currentPath;
            }
        } else {
            // Production mode: /en/ -> /zh/
            const currentSegments = window.location.pathname.split('/').filter(Boolean);
            const langIndex = currentSegments.findIndex(s => s === 'en' || s === 'zh');
            if (langIndex !== -1) {
                currentSegments[langIndex] = targetLangConfig.pathPrefix;
                newPath = '/' + currentSegments.join('/');
            } else {
                // Fallback: prepend the language prefix
                newPath = '/' + targetLangConfig.pathPrefix + currentPath;
            }
        }
        
        // Ensure path doesn't end with just / (unless it's root)
        if (newPath === '/') {
            newPath = '/index.html';
        }
        
        // Preserve hash and query parameters
        const newUrl = newPath + window.location.search + window.location.hash;
        window.location.href = newUrl;
    }
    
    // Create language switcher UI - styled like mdbook theme toggle
    function createLanguageSwitcher() {
        const currentLang = getCurrentLanguage();
        
        // Find the right-buttons container (where print button is)
        const rightButtons = document.querySelector('.right-buttons');
        if (!rightButtons) {
            console.warn('Could not find .right-buttons container');
            return;
        }
        
        // Find the print button to insert before it
        const printButton = document.getElementById('print-button');
        const printLink = printButton ? printButton.closest('a') : rightButtons.querySelector('a[href*="print"]');
        if (!printLink) {
            console.warn('Could not find print button');
            return;
        }
        
        // Check if language switcher already exists
        if (document.getElementById('mdbook-lang-toggle')) {
            return;
        }
        
        // Create simple text button for language switching
        const langToggle = document.createElement('button');
        langToggle.id = 'mdbook-lang-toggle';
        langToggle.className = 'lang-text-button';
        langToggle.type = 'button';
        langToggle.title = 'Switch language';
        langToggle.setAttribute('aria-label', 'Switch language');
        
        // Display opposite language text
        // If current is Chinese, show "En", if current is English, show "中"
        langToggle.textContent = currentLang === 'zh-CN' ? 'En' : '中';
        
        // Click to directly switch language
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            // Toggle to the other language
            const targetLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
            switchLanguage(targetLang);
        });
        
        // Insert button before print button (in right-buttons)
        rightButtons.insertBefore(langToggle, printLink);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createLanguageSwitcher);
    } else {
        createLanguageSwitcher();
    }
})();


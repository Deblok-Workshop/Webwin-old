try {
// Check if the URL parameter nobrowsercheck is set to "yes" or "true"
const urlParams = new URLSearchParams(window.location.search);
const bypCheck = urlParams.get('nobrowsercheck');

if (bypCheck !== 'yes' && bypCheck !== 'true') {
    const ua = window.navigator.ua;
    const firefoxCompat = /Firefox\/(\d+)/.test(ua) && parseInt(RegExp.$1) > 86;
    const chromeCompat = /Chrome\/(\d+)/.test(ua) && parseInt(RegExp.$1) > 89;
    const edgeCompat = /Edg\/(\d+)/.test(ua) && parseInt(RegExp.$1) > 92;
    const isIE = /Trident/.test(ua);
    if (!firefoxCompat && !chromeCompat && !edgeCompat || isIE) {
        window.location.href = 'outdated.html';
    }
}
} catch {window.location.href = 'outdated.html';}

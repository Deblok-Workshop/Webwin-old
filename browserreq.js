const urlParams = (function () {
    const match = window.location.search.match(/(\w+)=(\w+)/g);
    return match ? match.reduce((params, param) => {
        const [key, value] = param.split('=');
        params[key] = value;
        return params;
    }, {}) : {};
})();

const bypCheck = urlParams.nobrowsercheck;

if (bypCheck !== 'yes' && bypCheck !== 'true') {
    const ua = window.navigator.userAgent;
    const firefoxCompat = /Firefox\/(\d+)/.test(ua) && parseInt(RegExp.$1) > 23;
    const chromeCompat = /Chrome\/(\d+)/.test(ua) && parseInt(RegExp.$1) > 59;
    const isIE = /Trident/.test(ua);
    if (!firefoxCompat || !chromeCompat || isIE) {
        window.location.href = 'outdated.html';
    }
}

let monaco;
let fetching = false;
let pending = [];

const callbackEveryone = m => {
    pending.map(cb => cb !== undefined ? cb(m) : null);
    monaco = m;
    fetching = false;
    pending = [];
};

export const init = new Promise((resolve, reject) => {
    if (monaco !== undefined) {
        resolve(monaco);
    }
    else {
        pending.push(resolve);
        if (!fetching) {
            fetching = true;
            const loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = 'vs/loader.js';
            loaderScript.addEventListener('load', () => window.require(['vs/editor/editor.main'], () => callbackEveryone(window.monaco)));
            document.body.appendChild(loaderScript);
        }
    }
});

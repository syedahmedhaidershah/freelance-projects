const buffers = {
    xhrs: {
        watchdog: new XMLHttpRequest()
    },
    intervals: {
        watchdog: null
    },
    previoushtml: null,
    base: 'http://localhost/'
};

const modular = {
    init: () => document.addEventListener('DOMContentLoaded', modular.proceed, false),
    proceed: () => {
        modular.initListeners();
    },
    initWatchDog: () => {
        modular.checkHtml();
    },
    checkHtml: () => {
        buffers.xhrs.watchdog.open('GET', buffers.base, true);
        buffers.xhrs.watchdog.send();
    },
    initListeners: () => {
        if (env.environment.dev) {
            buffers.xhrs.watchdog.onreadystatechange = (ev) => {
                if (buffers.xhrs.watchdog.readyState === 4 && buffers.xhrs.watchdog.status === 200) {
                    if (buffers.previoushtml === null) {
                        buffers.previoushtml = buffers.xhrs.watchdog.response;
                    } else if (buffers.previoushtml != buffers.xhrs.watchdog.response) {
                        location.reload();
                    }
                    setTimeout(() => modular.checkHtml(), 100);
                }
            }
            modular.initWatchDog();
        }
    },
    inline: {
        signup: () => {
            const sf = document.getElementById('signup-form');
            const val = [
                'mobilenumber',
                'name',
                'password',
                'confirmpassword',
                'addresscity',
                'addresslocality',
                'landmark',
                'addresseg'
            ];

            const form = {};

            const els = Array.from(document.querySelectorAll('input[type]'));

            els.forEach(el => {
                if (val.includes(el.name)) {
                    form[el.name] = el.value;
                }
            });

            complete = Object.values(form).map(v => (v === '') ? false : true).reduce((p, c) => p && c);

            if (complete) {
                sf.submit();
            } else {
                alert('Please input all of the fields')
            }
        }
    }
};

modular.init();
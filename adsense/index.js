require('chromedriver');
const fetch = require('node-fetch');
const { parse: htmlp } = require('node-html-parser');
const { exec } = require('child_process');
const _ = require('lodash');
const fs = require('fs');
const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const proxyUri = 'https://www.vpngate.net/en/';
const hit = 'https://ventiureon.com';

const ipReg = new RegExp(/\d{0,3}[.]\d{0,3}[.]\d{0,3}[.]\d{0,3}/);
const textReg = new RegExp(/[a-zA-Z]+/);

let i = 0;
let len = 0;

const cp = [];

const getProxy = async() => {

    let proxyAddress = 'http://151.22.181.222:8080';
    // Setting the proxy-server option is needed to info chrome to use proxy
    let option = new chrome.Options().addArguments(`--proxy-server=${proxyAddress}`);
    const driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(option)
        .build();
    try {
        await driver.get(hit);
        // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        setTimeout(async() => { await driver.quit() }, 2000)
    }

    const res = await fetch(proxyUri, {
        method: 'GET',
    });
    const curl = await res.text();

    const html = htmlp(curl);

    console.log('Generating IPs');

    let ips = Array.from(html.querySelectorAll('span'))
        .filter(s => s.childNodes[0])
        .map(s => s.childNodes[0].rawText)
        .filter(raw => ipReg.exec(raw))
        .filter(raw => !(textReg.exec(raw)))
        // .map((ip, i,) => {
        //     const parts = ip.split('.');

    //     const newIps = Array.apply(null, new Array(256))
    //         .map((e, i) => {
    //             parts[parts.length - 1] = i;
    //             ip = parts.join('.');
    //             return ip;
    //         });
    //     return newIps;
    // });

    ips = _.flattenDeep(ips)
        .filter((ip, i) => i === 5);

    len = ips.length;

    console.log(ips);

    passProxies(ips, i);
}

const passProxies = (p, i) => {

    if (!p[i]) { console.log(`returning from ${i}`); return false; }

    setTimeout(async() => {
        try {
            if (p[i]) {
                let proxyAddress = p[i];
                // Setting the proxy-server option is needed to info chrome to use proxy
                let option = new chrome.Options().addArguments(`--proxy-server=https://vpn:vpn@${proxyAddress}:80`);
                const driver = new Builder()
                    .forBrowser('chrome')
                    .setChromeOptions(option)
                    .build();
                try {
                    await driver.get('http://www.google.com/ncr');
                    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
                    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
                } finally {
                    setTimeout(async() => { await driver.quit() }, 2000)
                }
                // cp[i] = exec(`curl -X ${p[i]} -A "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0" ${hit} --keepalive-time 60`, (error, stdout, stderr) => {
                //     if (error) {
                //         console.log(`${p[i]} not available`);
                //         const optOut = p.indexOf(p[i]);
                //         p.splice(optOut, 1);
                //         return;
                //     }
                //     console.log(`Executed on ${p[i]}`);
                //     // console.log(`stdout: ${stdout}`);
                //     // console.error(`stderr: ${stderr}`);
                // });
            }
        } catch (exc) {
            console.log(`${p[i]} not available`);
            const optOut = p.indexOf(p[i]);
            p.splice(i, 1);
        }
    }, 1000);

    i++;

    setTimeout(() => {
        passProxies(p, i);
    }, 10);
}

getProxy();
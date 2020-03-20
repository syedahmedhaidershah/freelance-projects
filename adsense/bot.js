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

const proxyUri = 'https://hide.me/en/proxy';
const hit = 'https://ventiureon.com';

const ipReg = new RegExp(/\d{0,3}[.]\d{0,3}[.]\d{0,3}[.]\d{0,3}/);
const textReg = new RegExp(/[a-zA-Z]+/);

let i = 0;
let len = 0;

const cp = [];

const getProxy = async() => {
    // Setting the proxy-server option is needed to info chrome to use proxy
    // let option = new chrome.Options().addArguments(`--proxy-server=${proxyAddress}`);
    const driver = new Builder()
        .forBrowser('chrome')
        // .setChromeOptions(option)
        .build();
    try {
        await driver.get(proxyUri);
        await driver.findElement(By.className('form-control')).sendKeys(hit);
        await (await driver.findElement(By.xpath('//*[@id="hide_register_save"]'))).click();
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        // setTimeout(async() => { await driver.quit() }, 2000)
    }
}

getProxy()
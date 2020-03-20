const req = require('request');
const parser = require('node-html-parser').parse;
const uri = 'https://www.pakwheels.com/used-cars/';

async function getHTML(html) {
    return await parser(html);
}

async function getElText(query, root) {
    return await root.querySelector(query);
}

const names = [];

req.get(uri, (e, r, b) => {
    if (b == null) return console.log('b', b);
    getHTML(b).then(root => {
        if (root == null) return console.log('root', root);
        getElText('li > div > div.cards-content > h3', root).then(els => {
            if (els == null) return console.log('els', els);
            let cache = [];
        });
    });
})
const availableRoutes = require('../imports/routes').available;
const router = require('express').Router;

global.routers = {};

module.exports = (app, io) => {
    availableRoutes.forEach(ar => {
        routers[ar] = new router();

        app.use('/'.concat(ar), routers[ar]);

        require(`../routers/${ar}`)(routers[ar], io);

        routers[ar].get('*', (req, res) => {
            res.status(403);
            res.send('access denied');
        });

        if (env.environment.dev) console.log(`Router setup for "${ar}"`);
    });

    app.all('*', (req, res, next) => {
        res.status(403);
        res.send('access denied');
    });
}
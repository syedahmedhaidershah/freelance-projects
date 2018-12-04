const jwt = require("jsonwebtoken");
const config = require('./config/default');
//Format of token
//Authorization: bearer actual token
//Verify token
exports.verifyToken = function verifyToken(req, res, next) {
    //Get the auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if not null
    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from header
        const bearerToken = bearer[0];
        //Set the token
        req.token = bearerToken;
        jwt.verify(req.token, config.secret, (err, authData) => {
            if (err) {
                res.statusCode = 498;
                res.setHeader('Content-Type', 'application/json');
                res.json(err);
            }
            else {
                if (req.body != null) {
                    req.body.UserId = authData.user._id;
                    req.body.CreatedBy = authData.user._id;
                }
                else {
                    req.body = {};
                    req.body.CreatedBy = authData.user.Username;
                    req.body.UserId = authData.user.ID;
                }
                next();
            }
        });
    }
    else {
        //forbidden
        res.sendStatus(403);
    }
};
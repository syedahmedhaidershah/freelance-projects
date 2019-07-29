module.exports = (router) => {
    router.get('/halleffect', (req, res) => {
        // console.log(req.params);
        global.reading = req.query.reading;
        res.sendStatus(200);
    })
}
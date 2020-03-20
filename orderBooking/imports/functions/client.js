const clients = db.collection('clients');

module.exports = {

    addNew: (req, res) => {
        const client = req.body;
        client.registeredAt = new Date().toString();
        clients.insertOne(
            client,
            (docs, callback) => {
                res.send(
                    defs.msg('Client successfully added to database')
                );
            });
    },

    getOne: (req, res) => {
        clients.find(req.body).sort({ registeredAt: -1 }).limit(1).toArray()
            .then(arr => {
                res.send(
                    defs.msg(arr)
                )
            });
    },

    getAll: (req, res) => {
        clients.find({}).sort({ registeredAt: -1 }).toArray()
            .then(arr => {
                res.send(
                    defs.msg(arr)
                )
            });
    },

    lastRegistered: (req, res) => {
        clients.find({}).sort({ registeredAt: -1 }).limit(1).toArray()
            .then(arr => {
                res.send(
                    defs.msg(arr)
                )
            });
    }

}
const users = db.collection('users');

module.exports = {

    addNew: (req, res) => {
        const user = req.body;
        user.registeredAt = new Date().toString();
        users.insertOne(
            user,
            (docs, callback) => {
                res.send(
                    defs.msg('User successfully added to database')
                );
            });
    },

    getOne: (req, res) => {
        users.find(req.body).sort({ registeredAt: -1 }).limit(1).toArray()
            .then(arr => {
                res.send(
                    defs.msg(arr)
                )
            });
    },

    getAll: (req, res) => {
        users.find(req.body).sort({ registeredAt: -1 }).toArray()
            .then(arr => {
                res.send(
                    defs.msg(arr)
                )
            });
    },

    lastRegistered: (req, res) => {
        users.find(req.body).sort({ registeredAt: -1 }).limit(1).toArray()
            .then(arr => {
                res.send(
                    defs.msg(arr)
                )
            });
    },

    login: (req, res) => {
        users.find(req.body).toArray()
            .then(arr => {
                if (arr.length == 0) {
                    res.send(defs.err('Invalid credentials'));
                } else {
                    res.send(defs.msg('Login successful'));
                }
            });
    }

}
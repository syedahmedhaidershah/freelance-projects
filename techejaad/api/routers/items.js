let col = null;

const getAll = async (req, res, next) => {
    const list = await col.find({}).toArray();
    res.send({ error: false, message: list });
};

const insertOne = async (req, res, next) => {
    const inserted = await col.insertOne(req.body);

    res.send({ error: false, message: inserted });
}

const insertMany = async (req, res, next) => {
    const inserted = await col.insertMany(req.body.message);

    res.send({ error: false, message: inserted });
};

module.exports = (router, io) => {
    col = (__filename.includes('\/')) ?
        db.collection(__filename.split('\/').splice(-1)[0].split('.')[0]) :
        db.collection(__filename.split('\\').splice(-1)[0].split('.')[0]);

    router.post('/getall', getAll);

    router.post('/insert', insertOne);

    router.post('/insertmany', insertMany);
};
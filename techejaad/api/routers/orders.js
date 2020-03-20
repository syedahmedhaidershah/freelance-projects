let col = null;

const placeOrder = async(req, res, next) => {
    Object.assign(req.body, { status: 0, called: 0 });

    const inserted = await col.insertOne(req.body);

    res.send({ error: false, message: `Your order for ${req.body.itemName} has been placed. Our representative will call you shortly.` });
};

const retreiveOrder = async(req, res, next) => {
    const found = await col.find({
        contact: {
            $in: [
                req.body.contact,
                req.body.contact.substr(1),
                '0'.concat(req.body.concat)
            ]
        }
    }).toArray();

    res.send({ error: false, message: found });
};

module.exports = (router, io) => {
    col = (__filename.includes('\/')) ?
        db.collection(__filename.split('\/').splice(-1)[0].split('.')[0]) :
        db.collection(__filename.split('\\').splice(-1)[0].split('.')[0]);

    router.post('/placeorder', placeOrder);

    router.post('/retreiveorders', retreiveOrder);
};
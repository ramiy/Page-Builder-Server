const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

function query(userId = '') {
    var criteria = {};
    if (userId) criteria.user_id = new ObjectId(userId);

    return mongoService.connect()
        .then(db => {
            const collection = db.collection('site');
            return collection.find(criteria).toArray();
        });
}

function getById(siteId) {
    siteId = new ObjectId(siteId);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('site');
            return collection.findOne({ _id: siteId });
        });
}

function remove(siteId) {
    siteId = new ObjectId(siteId);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('site');
            return collection.remove({ _id: siteId });
        });
}

function add(site) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('site');
            return collection.insertOne(site)
                .then(res => {
                    site._id = res.insertedId;
                    return site;
                });
        });
}

function update(site) {
    site._id = new ObjectId(site._id);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('site');
            return collection.updateOne({ _id: site._id }, { $set: site })
                .then(res => {
                    return site;
                });
        });
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

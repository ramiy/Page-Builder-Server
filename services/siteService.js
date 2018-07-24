const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

// List of sites
function query(userId = '') {
    var criteria = {};
    if (userId) criteria.user_id = new ObjectId(userId);

    return mongoService.connect()
        .then(db => {
            const collection = db.collection('site');
            return collection.find(criteria).toArray();
        });
}

// Single site
function getById(siteId) {
    siteId = new ObjectId(siteId);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('site');
            return collection.findOne({ _id: siteId });
        });
}

// Remove site
function remove(siteId) {
    siteId = new ObjectId(siteId);
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('site');
            return collection.remove({ _id: siteId });
        });
}

// Add site
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

// Update site
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

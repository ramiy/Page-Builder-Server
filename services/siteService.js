const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

// List of sites
function query(filterBy) {
    var criteria = {};
    if (filterBy.user_id && filterBy.name) {
        criteria = { $and: [] };
        criteria.$and.push({ user_id: new ObjectId(filterBy.user_id) });
        criteria.$and.push({ name: { $regex: `.*${filterBy.name}.*` } });
    }
    else {
        if (filterBy.user_id || filterBy.name) {
            if (filterBy.name) criteria.name = { $regex: `.*${filterBy.name}.*` };
            if (filterBy.user_id) criteria.user_id = new ObjectId(filterBy.user_id);
        }
        // else return Promise.reject()
    }

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

// Sites by user name
function getByUserName(userName) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('site');
            return collection.aggregate([
                {
                    $match: { _id: _id }
                },
                {
                    $lookup:
                    {
                        from: 'user',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup:
                    {
                        from: 'site',
                        localField: 'siteId',
                        foreignField: '_id',
                        as: 'site'
                    }
                },
                {
                    $unwind: '$site'
                }
            ]).toArray()
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
    update,
    getByUserName
}

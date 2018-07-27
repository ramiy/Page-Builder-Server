const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    getByUserName,
    remove,
    add,
    update
}

// List of sites
function query(filterBy) {
    var criteria = {};

    // Several filters
    if (filterBy.user_id && filterBy.name) {
        criteria = { $and: [] };
        criteria.$and.push({ user_id: new ObjectId(filterBy.user_id) });
        criteria.$and.push({ name: { $regex: `.*${filterBy.name}.*` } });
    }
    // One filter
    else if (filterBy.user_id || filterBy.name) {
        if (filterBy.user_id) criteria.user_id = new ObjectId(filterBy.user_id);
        if (filterBy.name) criteria.name = { $regex: `.*${filterBy.name}.*` };
    }

    return mongoService.connect()
        .then(db => db.collection('site').find(criteria).toArray())
        .catch(err => console.log('Mongodb error.', err));
}

// Single site
function getById(siteId) {
    siteId = new ObjectId(siteId);
    return mongoService.connect()
        .then(db => db.collection('site').findOne({ _id: siteId }))
        .catch(err => console.log('Mongodb error.', err));
}

// Sites by user name
function getByUserName(userName) {
    return mongoService.connect()
        .then(db => {
            return db.collection('site').aggregate([
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
        })
        .catch(err => console.log('Mongodb error.', err));

}

// Remove site
function remove(siteId) {
    siteId = new ObjectId(siteId);
    return mongoService.connect()
        .then(db => db.collection('site').remove({ _id: siteId }))
        .catch(err => console.log('Mongodb error.', err));
}

// Add site
function add(site) {
    return mongoService.connect()
        .then(db => {
            return colldb.collection('site').insertOne(site)
                .then(res => {
                    site._id = res.insertedId;
                    return site;
                });
        })
        .catch(err => console.log('Mongodb error.', err));
}

// Update site
function update(site) {
    site._id = new ObjectId(site._id);
    return mongoService.connect()
        .then(db => {
            return db.collection('site').updateOne({ _id: site._id }, { $set: site })
                .then(res => site);
        })
        .catch(err => console.log('Mongodb error.', err));
}

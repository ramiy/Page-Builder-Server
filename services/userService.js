const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

function query() {
    return mongoService.connect()
        .then(db => db.collection('user').find({}).toArray());
}

function checkLogin({ nickname }) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ nickname }));
}

function getById(id) {
    const _id = new ObjectId(id);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id }));
}

function addUser({ nickname }) {
    // TODO: Add user only if nickname is not taken
    var user = { nickname }
    return mongoService.connect()
        .then(db => db.collection('user').insertOne(user))
        .then(res => {
            user._id = res.insertedId;
            return user;
        });
}

module.exports = {
    query,
    checkLogin,
    getById,
    addUser
}

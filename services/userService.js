const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

function query() {
    return mongoService.connect()
        .then(db => db.collection('user').find({}).toArray());
}

function checkLogin({ userName }) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ userName }));
}

function getById(id) {
    const _id = new ObjectId(id);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id }));
}

function addUser({ userName }) {
    // TODO: Add user only if userName is not taken
    var user = { userName }
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

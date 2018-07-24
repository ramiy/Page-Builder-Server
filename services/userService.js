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
    return checkLogin({ userName })
        .then(user => {
            if (user) return null;
            var user = { userName };
            return mongoService.connect()
                .then(db => db.collection('user').insertOne(user))
                .then(res => {
                    user._id = res.insertedId;
                    return user;
                });
        })
        .catch(err => console.log('user already exited'))
}

function updateUser(updatedUser) {
    const _id = new ObjectId(updatedUser._id);
    return mongoService.connect()
        .then(db => db.collection('user').update({ "_id":_id }, { $set: updatedUser }))
}

module.exports = {
    query,
    checkLogin,
    getById,
    addUser,
    updateUser
}

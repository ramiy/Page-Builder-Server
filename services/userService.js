const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

// List of users
function query() {
    return mongoService.connect()
        .then(db => db.collection('user').find({}).toArray());
}

// Single user
function getById(id) {
    const _id = new ObjectId(id);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id }));
}

// Check if user logged-in
function checkLogin({ userName }) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ userName }));
}

// Add user
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

// Update user
function updateUser(updatedUser) {
    const _id = new ObjectId(updatedUser._id);
    return mongoService.connect()
        .then(db => db.collection('user').update({ "_id":_id }, { $set: updatedUser }))
}

module.exports = {
    query,
    getById,
    checkLogin,
    addUser,
    updateUser
}

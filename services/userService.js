const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

// List of users
function query() {
    return mongoService.connect()
        .then(db => db.collection('user').find({}).toArray());
}

// Single user by ID
function getById(id) {
    const _id = new ObjectId(id);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id }));
}

// Single user by username
function getByUserName(userName) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ userName }));
}

// Check if user logged-in
function checkLogin(userName, password) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ userName, password }));
}

// Add user
function addUser({ user }) {
    return mongoService.connect()
        .then(db => db.collection('user').insertOne(user));
}

// Update user
function updateUser(updatedUser) {
    const _id = new ObjectId(updatedUser._id);
    return mongoService.connect()
        .then(db => db.collection('user').update({ '_id': _id }, { $set: updatedUser }))
}

module.exports = {
    query,
    getById,
    getByUserName,
    checkLogin,
    addUser,
    updateUser
}

const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

// List of users
function query(filterBy) {
    var criteria = {};

    // Two parameters
    if (filterBy.id && filterBy.name) {
        criteria = { $and: [] };
        criteria.$and.push({ _id: new ObjectId(filterBy.id) });
        criteria.$and.push({ userName: { $regex: `.*${filterBy.name}.*` } });
    }
    // One parameter
    else if (filterBy.id || filterBy.name) {
        if (filterBy.id) criteria._id = new ObjectId(filterBy.id);
        if (filterBy.name) criteria.userName = { $regex: `.*${filterBy.name}.*` };
    }
    
    return mongoService.connect()
        .then(db => db.collection('user').find(criteria).toArray());
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
    user.isAdmin = false;
    return mongoService.connect()
        .then(db => db.collection('user').insertOne(user));
}

// Update user
function updateUser(updatedUser) {
    updatedUser._id = new ObjectId(updatedUser._id);
    return mongoService.connect()
        .then(db => db.collection('user').updateOne({ _id: updatedUser._id }, { $set: updatedUser }))
}







module.exports = {
    query,
    getById,
    getByUserName,
    checkLogin,
    addUser,
    updateUser
}

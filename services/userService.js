const mongoService = require('./mongoService');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    getByUserName,
    checkLogin,
    addUser,
    updateUser
}

// List of users
function query(filterBy = {}) {
    var criteria = {};

    // Several filters
    if (filterBy.id && filterBy.name) {
        criteria = { $and: [] };
        criteria.$and.push({ _id: new ObjectId(filterBy.id) });
        criteria.$and.push({ userName: { $regex: `.*${filterBy.name}.*` } });
    }
    // One filter
    else if (filterBy.id || filterBy.name) {
        if (filterBy.id) criteria._id = new ObjectId(filterBy.id);
        if (filterBy.name) criteria.userName = { $regex: `.*${filterBy.name}.*` };
    }

    return mongoService.connect()
        .then(db => db.collection('user').find(criteria).toArray())
        .catch(err => console.log('Mongodb error.', err));
}

// Single user by ID
function getById(id) {
    const _id = new ObjectId(id);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id }))
        .catch(err => console.log('Mongodb error.', err));
}

// Single user by username
function getByUserName(userName) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ userName }))
        .catch(err => console.log('Mongodb error.', err));
}

// Check if user logged-in
function checkLogin(userName, password) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ userName, password }))
        .catch(err => console.log('Mongodb error.', err));
}

// Add user
function addUser(user) {
    // Check whether the user already exist
    return query()
        .then(users => {
            var isFound = users.find(currUser => {
                return currUser.userName.toLowerCase() === user.userName.toLowerCase()
            })
            if(isFound) return null;
            // // Otherwise add new user
            
            user.isAdmin = false;
            return mongoService.connect()
                .then(db => db.collection('user').insertOne(user))
                .catch(err => console.log('Mongodb error.', err));
        })
}

// Update user
function updateUser(updatedUser) {
    // Check whether the user already exist
    let userName = updatedUser.userName;
    return getByUserName(userName)
        .then(user => {
            // Bail if user exist
            if (user && user._id.toString() !== updatedUser._id) return null;

            // Otherwise add new user
            updatedUser._id = new ObjectId(updatedUser._id);
            return mongoService.connect()
                .then(db => db.collection('user').updateOne({ _id: updatedUser._id }, { $set: updatedUser }))
                .catch(err => console.log('Mongodb error.', err));
        });
}

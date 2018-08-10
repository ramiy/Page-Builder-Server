const userService = require('../services/userService');

module.exports = (app) => {

    // List of users
    app.get('/user', (req, res) => {
        const filterBy = {};
        if (req.query.id !== 'undefined') filterBy.id = req.query.id;
        if (req.query.name !== 'undefined') filterBy.name = req.query.name;

        userService.query(filterBy)
            .then(users => res.json(users))
            .catch(err => console.log('An error accord while querying users.', err));
    });

    // Single user by ID
    app.get('/user/:userId', (req, res) => {
        const userId = req.params.userId;
        return userService.getById(userId)
            .then(user => res.json(user))
            .catch(err => console.log('An error accord while querying user data.', err));
    });

    // Add user
    app.post('/user', (req, res) => {
        const userData = req.body;
        userService.addUser(userData.user)
            .then(user => res.json(user))
            .catch(err => console.log('An error accord while creating new user.', err));
    });

    // Update user
    app.put('/user/:userId', (req, res) => {
        const user = req.body;
        userService.updateUser(user)
            .then(user => res.json(user))
            .catch(err => console.log('An error accord while saving user data.', err));
    });

}

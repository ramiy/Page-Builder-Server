const userService = require('../services/userService');

module.exports = (app) => {

    // List of users
    app.get('/user', (req, res) => {
        const filterBy = {};
        if (req.query.id !== 'undefined') filterBy.id = req.query.id;
        if (req.query.name !== 'undefined') filterBy.name = req.query.name;

        userService.query(filterBy)
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                console.log('An error accord.');
            });
    });

    // Single user by ID
    app.get('/user/:userId', (req, res) => {
        const userId = req.params.userId;
        return userService.getById(userId)
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                console.log('An error accord.');
            });
    });

    // Add user
    app.post('/user', (req, res) => {
        userService.addUser(req.body)
            .then()
            .catch(err => {
                console.log('Wrong username.')
            });
    });

}

const userService = require('../services/userService');

module.exports = (app) => {

    // List of users
    app.get('/user', (req, res) => {
        userService.query()
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                console.log('An error accord.');
            });
    });

    // Single user
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

const userService = require('../services/userService');

module.exports = (app) => {

    // List of users
    app.get('/user', (req, res) => {
        userService.query()
            .then(users => res.json(users))
    })

    // Single user 
    app.get('/user/:userId', (req, res) => {
        const userId = req.params.userId
        return userService.getById(userId)
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                console.log('An error accord.');
            });
    })

    // Set logged-in user
    app.post('/user/setUser', (req, res) => {
        userService.checkLogin(req.body)
            .then(user => {
                req.session.loggedinUser = user;
                res.json(user);
            })
            .catch(err => {
                console.log('Wrong username.')
            });
    })

}

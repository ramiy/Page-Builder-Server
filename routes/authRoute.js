const userService = require('../services/userService');

module.exports = (app) => {

    // Login
    app.put('/login', (req, res) => {
        const username = req.body.username
        userService.checkLogin({ username })
            .then(user => {
                req.session.user = user
                res.json(user)
            });
    })

    // Register new user
    app.post('/singup', (req, res) => {
        const username = req.body.username
        userService.addUser({ username })
            .then(user => res.json(user));
    })

}

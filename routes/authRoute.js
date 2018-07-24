const userService = require('../services/userService');

module.exports = (app) => {

    // Login
    app.put('/login', (req, res) => {
        const userName = req.body.userName;
        userService.checkLogin({ userName })
            .then(user => {
                req.session.user = user
                res.json(user)
            });
    });

    // Register new user
    app.post('/singup', (req, res) => {
        const username = req.body.user;
        userService.addUser({ username })
            .then(user => res.json(user));
    });

}

const userService = require('../services/userService');

module.exports = (app) => {

    // Login
    app.put('/login', (req, res) => {
        const userName = req.body.userName;
        const password = req.body.password;
        userService.checkLogin({ userName }, { password })
            .then(user => {
                req.session.user = user
                res.json(user)
            });
    });

    //logout
    app.post('/logout', (req, res) => {
        console.log('server log out');

        req.session.user = null
        res.json({ msg: 'logout' })
    });


    // Register new user
    app.post('/singup', (req, res) => {
        const username = req.body.user;
        userService.addUser({ username })
            .then(user => res.json(user));
    });

}

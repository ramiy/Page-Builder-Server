const userService = require('../services/userService');

module.exports = (app) => {

    // Login
    app.put('/login', (req, res) => {
        const userName = req.body.userName;
        const password = req.body.password;
        userService.checkLogin(userName, password)
            .then(user => {
                req.session.user = user;
                res.json(user);
            })
            .catch(err => console.log('An error accord in the login process.', err));
    });

    // Logout
    app.post('/logout', (req, res) => {
        req.session.user = null;
        res.json({ msg: 'logout' });
    });

}

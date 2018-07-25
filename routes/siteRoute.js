const siteService = require('../services/siteService');
const userService = require('../services/userService');

module.exports = (app) => {

    // List of sites
    app.get('/site', (req, res) => {
        console.log('URL Query:', req.query);
        const filterBy = { user_id: req.query.user_id };
        console.log('req.query.user_id', req.query.user_id)
        console.log('req.query.name', req.query.name)
        if (req.query.name !== 'undefined') filterBy.name = req.query.name
        console.log('site route backend filterBy'.filterBy)

        siteService.query(filterBy)
            .then(sites => res.json(sites));
    });

    // Sites By userName
    app.get('/site/user/:userName', (req, res) => {
        const userName = req.params.userName;
        console.log('username !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', userName)
        return userService.getByUserName(userName)
            .then(user => {
                var filterBy = { name: '', user_id: user._id };
                console.log('filterBy!!!!!!!!!!!!!!!!!!!!!?????????????', filterBy)

                return siteService.query(filterBy)
                    .then(sites => {
                        console.log('we got sites!:', sites)
                        return res.json(sites)
                    });
            })
    });

    // Single site
    app.get('/site/:siteId', (req, res) => {
        const siteId = req.params.siteId;
        siteService.getById(siteId)
            .then(site => res.json(site));
    });

    // Delete site
    app.delete('/site/:siteId', (req, res) => {
        if (!req.session.loggedinUser || !req.session.loggedinUser.isAdmin) {
            return res.status(403).send('Access forbidden.');
        }
        const siteId = req.params.siteId;
        siteService.remove(siteId)
            .then(() => res.end(`Site ${siteId} Deleted.`));
    });

    // Add site
    app.post('/site', (req, res) => {
        if (!req.session.loggedinUser || !req.session.loggedinUser.isAdmin) {
            return res.status(403).send('Access forbidden.');
        }
        const site = req.body;
        siteService.add(site)
            .then(site => res.json(site));
    });

    // Update site
    app.put('/site/:siteId', (req, res) => {
        if (!req.session.loggedinUser || !req.session.loggedinUser.isAdmin) {
            return res.status(403).send('Access forbidden.');
        }
        const site = req.body;
        siteService.update(site)
            .then(site => res.json(site));
    });

}

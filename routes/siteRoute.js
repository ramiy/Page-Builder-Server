const siteService = require('../services/siteService');
const userService = require('../services/userService');

module.exports = (app) => {

    // List of sites
    app.get('/site', (req, res) => {
        const filterBy = {};
        if (req.query.user_id !== 'undefined') filterBy.user_id = req.query.user_id;
        if (req.query.name !== 'undefined') filterBy.name = req.query.name;

        siteService.query(filterBy)
            .then(sites => res.json(sites));
    });

    // Sites By userName
    app.get('/site/user/:userName', (req, res) => {
        const userName = req.params.userName;
        return userService.getByUserName(userName)
            .then(user => {
                var filterBy = { name: '', user_id: user._id };
                return siteService.query(filterBy)
                    .then(sites => res.json(sites));
            });
    });

    // Single site
    app.get('/site/:siteId', (req, res) => {
        const siteId = req.params.siteId;
        siteService.getById(siteId)
            .then(site => res.json(site));
    });

    // Delete site
    app.delete('/site/:siteId', (req, res) => {
        const siteId = req.params.siteId;
        return siteService.remove(siteId)
            .then(isDelete => {
                if (isDelete) {
                    res.status(200)
                    res.end(`Site ${siteId} Deleted.`);
                }
                else {
                    res.status(404)
                    res.end('Can\'t delete site.');
                }
            })
    });

    // Add site
    app.post('/site', (req, res) => {
        const site = req.body;
        siteService.add(site)
            .then(site => res.json(site));
    });

    // Update site
    app.put('/site/:siteId', (req, res) => {
        const site = req.body;
        siteService.update(site)
            .then(isUpdate => {
                if (isUpdate) {
                    res.status(200)
                    res.end(`Site ${site._id} has been Updated.`);
                }
                else {
                    res.status(404)
                    res.end('Can\'t update site.');
                }
            })
    });

    // Create site
    app.post('/site/:siteId', (req, res) => {
        const site = req.body;
        siteService.create(site)
            .then(site => {
                if (site) {
                    res.status(200)
                    res.json(site)
                    res.end(`New Site has been Created! his id is: ${site._id}.`);
                }
                else {
                    res.status(404)
                    res.end('Can\'t create new site.');
                }
            })
    });

}

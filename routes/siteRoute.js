const siteService = require('../services/siteService');

module.exports = (app) => {

    // List of sites
    app.get('/site', (req, res) => {
        siteService.query()
            .then(sites => res.json(sites));
    });
    app.get('/site/:userId', (req, res) => {
        var userId=req.params.userId
        siteService.query(userId)
            .then(sites => res.json(sites));
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

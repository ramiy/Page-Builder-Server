var dbConn = null;

function connectToMongo() {
	// Reuse existing connection if exist
	if (dbConn) return Promise.resolve(dbConn);

	const MongoClient = require('mongodb').MongoClient;
	// const url = (!process.env.PORT)
	// 	? 'mongodb://localhost:27017/page_builder'
	// 	: 'mongodb://page_builder_user:page_builder43@ds145921.mlab.com:45921/page_builder';

	const url = 'mongodb://page_builder_user:page_builder43@ds145921.mlab.com:45921/page_builder';

	return MongoClient.connect(url)
		.then(client => {
			console.log('MongoDB Connected.');

			// If we get disconnected (e.g. db is down)
			client.on('close', () => {
				console.log('MongoDB Disconnected.');
				dbConn = null;
			});
			dbConn = client.db();
			return dbConn;
		})
}

module.exports = {
	connect: connectToMongo
}

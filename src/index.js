const createStreamToDatabase = require('./create-stream-to-database');
const createNodeStatement = require('./node');
const createRelationshipStatement = require('./relationship');

module.exports = createStreamToDatabase;
module.exports.createStreamToDatabase = createStreamToDatabase;
module.exports.createNodeStatement = createNodeStatement;
module.exports.createRelationshipStatement = createRelationshipStatement;

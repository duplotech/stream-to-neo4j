const debug = require('debug')('stream-to-neo4j');
const cypherStream = require('cypher-stream');
const tap = require('tap-stream');

const createToStatement = require('./create-to-statement');
const autoTransaction = require('./auto-transaction');

const toDebugLog = tap(data => debug(data));

function createStreamToDatabase ({ url, username, password, exitOnCommit }, generateStatements, toType) {
  const cs = cypherStream(url, username, password);
  return stream => {
    const toStatement = createToStatement(generateStatements, toType);
    return stream
      .pipe(toStatement)
      .pipe(toDebugLog)
      .pipe(autoTransaction(cs, { exitOnCommit }));
  };
}

module.exports = createStreamToDatabase;

const debug = require('debug')('stream-to-neo4j:create-to-statement');

const map = require('through2-map');

const prop = propName => (obj = {}) => obj[propName];
const isTruthy = v => !!v;
const cleanWhitespace = v =>
  Object.assign(
    {},
    v,
    v && typeof v.statement === 'string' ? { statement: v.statement.trim().replace(/\s\s+/g, ' ') } : null
  );

const createToStatement = (generateStatements, toType = prop('type')) => map.obj(v => {
  const type = toType(v);
  const generateStatement = generateStatements[type];
  if (!generateStatement) {
    debug(`The type ${type} did not have a matching generateStatement function`);
  }
  const statements = generateStatement ? generateStatement(v) : [];
  return Array.isArray(statements) ? statements.filter(isTruthy).map(cleanWhitespace) : cleanWhitespace(statements);
});

module.exports = createToStatement;

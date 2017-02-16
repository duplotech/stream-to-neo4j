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

const createToStatement = (generateStatements, toType = prop('type'), commitSize) => {
  let count = 0;
  return map.obj(v => {
    const type = toType(v);
    const generateStatement = generateStatements[type];
    if (!generateStatement) {
      debug(`The type ${type} did not have a matching generateStatement function`);
    }

    const statements = [].concat(generateStatement ? generateStatement(v) : []);

    count += statements.length;
    if (commitSize && count >= commitSize) {
      debug(`The statement count has reached ${count} so a commit is prepared`);
      statements.push({ commit: true });
      count = 0;
    }

    return statements.filter(isTruthy).map(cleanWhitespace);
  });
};

module.exports = createToStatement;

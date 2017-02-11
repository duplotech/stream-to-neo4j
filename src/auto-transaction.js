const writer = require('flush-write-stream');

const onCommitted = exitOnCommit => () => {
  debug('committed')
  if (exitOnCommit === true) {
    debug('exiting');
    process.exit(0);
  }
};

const autoTransaction = (cs, options = {}) => {
  let transaction;
  return writer.obj((data, enc, callback) => {
    if (!transaction || transaction.committed === true) {
      transaction = cs.transaction();
      transaction.on('comitted', onCommitted(options.exitOnCommit));
    }

    transaction.write(data);

    callback();
  });
};

module.exports = autoTransaction;

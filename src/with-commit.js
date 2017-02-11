function withCommit (statement) {
  return Object.assign({}, statement, { commit: true });
}

module.exports = withCommit;

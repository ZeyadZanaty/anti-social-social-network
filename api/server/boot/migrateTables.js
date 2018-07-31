module.exports = migrateTables;

function migrateTables(server) {
  var storage = server.datasources.db;

  storage.autoupdate();
}

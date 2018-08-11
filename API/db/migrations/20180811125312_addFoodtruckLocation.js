const tableNames = require('../util/tableNames');

exports.up = (knex, Promise) => {
  return knex.schema.table(tableNames.FOODTRUCK, (table) => {
    table.specificType('currentLocation', 'geometry(point, 4326)');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.table(table.FOODTRUCK, (table) => {
    table.dropColumn('currentLocation');
  });
};

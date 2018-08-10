const tableNames = require('../util/tableNames');

exports.up = (knex, Promise) => {
  return knex.schema.createTable(tableNames.FOODTRUCK, (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.timestamps(false, true);
  });
};

exports.down = (knex, Promise) => {
  console.log(`dropping: ${tableNames.FOODTRUCK}`);
  return knex.schema.dropTableIfExists(tableNames.FOODTRUCK);
};

const knex = require('knex')(require('../knexfile'));
const FoodTruck = require('../../entities/foodTruck');
const tableNames = require('../util/tableNames');
const DataStoreError = require('./dataStoreError');

/**
 * Data store that handles all CRUD operations related to foodtrucks.
 */

/**
 * @function getAllFoodTrucks
 * Function that fetches all food trucks from the database
 */
const getAllFoodTrucks = async () => {
  const selectedRows = await knex.select().from(tableNames.FOODTRUCK);
  const foodTrucks = selectedRows.map((selectedRow) => {
    if (!FoodTruck.verifyRowObject(selectedRow)) {
      throw new DataStoreError('Invalid row object received while fetching a Food Truck');
    }
    return new FoodTruck(selectedRow.id, selectedRow.name);
  });
  return foodTrucks;
};

module.exports.getAllFoodTrucks = getAllFoodTrucks;

const knexPostgis = require('knex-postgis');
const knex = require('knex')(require('../knexfile'));
const FoodTruck = require('../../entities/foodTruck');
const tableNames = require('../util/tableNames');
const DataStoreError = require('./dataStoreError');

// install the postgis function in the knex instance.
const st = knexPostgis(knex);

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
    return new FoodTruck(selectedRow.id, selectedRow.name, selectedRow.currentLocation);
  });
  return foodTrucks;
};

const getFoodTruckFromId = async (id) => {
  let foodTruck = null;
  const selectedRows = await knex
    .select('id', 'name', st.asGeoJSON('currentLocation'))
    .from(tableNames.FOODTRUCK)
    .where('id', id);

  if (selectedRows.length > 0) {
    foodTruck = new FoodTruck(
      selectedRows[0].id,
      selectedRows[0].name,
      selectedRows[0].currentLocation,
    );
  }
  return foodTruck;
};

module.exports.getAllFoodTrucks = getAllFoodTrucks;
module.exports.getFoodTruckFromId = getFoodTruckFromId;

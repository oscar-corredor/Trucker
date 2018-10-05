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


const initializeFoodTrucks = selectedRows => selectedRows.map((selectedRow) => {
  if (!FoodTruck.verifyRowObject(selectedRow)) {
    throw new DataStoreError('Invalid row object received while fetching a Food Truck');
  }
  return new FoodTruck(selectedRow.id, selectedRow.name, selectedRow.currentLocation);
});

/**
 * @function getAllFoodTrucks
 * Function that fetches all food trucks from the database
 */
const getAllFoodTrucks = async () => {
  const selectedRows = await knex.select('id', 'name', st.asGeoJSON('currentLocation')).from(tableNames.FOODTRUCK);
  const foodTrucks = initializeFoodTrucks(selectedRows);
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

/**
 * Test ideas: update the id of the entity, update with a null object,
 *  update non-existing food truck, update non-existing property of the food truck
 * @param {*} id 
 * @param {*} patchedProperties 
 */
const updateFoodTruckLocation = async (id, patchedProperties) => {
  console.log(patchedProperties);
  const currentFoodTruck = await getFoodTruckFromId(id);
  if (!currentFoodTruck) throw new DataStoreError('Attempted to patch non-existing food truck');
  if (!patchedProperties) throw new DataStoreError('Null patched properties.');
  const updatedProperties = { ...patchedProperties };
  Object.keys(updatedProperties).forEach((key) => {
    if (key === 'id') throw new DataStoreError('The id of a foodtruck cannot be patched.');
    // check that the patched properties indeed belong to the food truck entity
    if (Object.getOwnPropertyNames(currentFoodTruck).indexOf(key) === -1) {
      throw new DataStoreError('Attempted to update a non-existent property');
    }
    if (key === 'currentLocation') {
      updatedProperties.currentLocation = st.setSRID(
        (st.makePoint(updatedProperties.currentLocation.coordinates[0],
          updatedProperties.currentLocation.coordinates[1])), 4326,
      );
    }
  });
  const affectedRows = await knex(tableNames.FOODTRUCK).where('id', id).update(updatedProperties, 'id');
  return affectedRows.length > 0;
};

const getFoodTrucksNearby = async (latitude, longitude) => {
  //   SELECT *
  // FROM public."foodTruck"
  // WHERE ST_Distance_Sphere("foodTruck"."currentLocation", ST_MakePoint(-99.147278, 19.375110))
  //  <= 1000
  const selectedRows = await knex
    .select()
    .from(tableNames.FOODTRUCK)
    .whereRaw(`ST_Distance_Sphere("foodTruck"."currentLocation", ST_MakePoint(${longitude}, ${latitude})) <= 1000`);
  return initializeFoodTrucks(selectedRows);
};

module.exports.getAllFoodTrucks = getAllFoodTrucks;
module.exports.getFoodTruckFromId = getFoodTruckFromId;
module.exports.updateFoodTruckLocation = updateFoodTruckLocation;
module.exports.getFoodTrucksNearby = getFoodTrucksNearby;

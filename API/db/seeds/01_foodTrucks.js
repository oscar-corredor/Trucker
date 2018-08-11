const knexPostgis = require('knex-postgis');
const FoodTruck = require('../../entities/foodTruck');

exports.seed = (knex, Promise) => {
  // install
  const st = knexPostgis(knex);

  // Deletes ALL existing entries
  return knex('foodTruck').del()
    .then(() => {
      const foodTruck1Location = st.setSRID((st.makePoint(4.394373, 50.823743)), 4326);
      const foodTruck1 = new FoodTruck(-1, 'FoodTruck 1', foodTruck1Location);
      const foodTruck2Location = st.setSRID((st.makePoint(4.394373, 50.823743)), 4326);
      const foodTruck2 = new FoodTruck(-1, 'FoodTruck 2', foodTruck2Location);
      const foodTruck3Location = st.setSRID((st.makePoint(4.394373, 50.823743)), 4326);
      const foodTruck3 = new FoodTruck(-1, 'FoodTruck 3', foodTruck3Location);
      const foodTruck4Location = st.setSRID((st.makePoint(4.394373, 50.823743)), 4326);
      const foodTruck4 = new FoodTruck(-1, 'FoodTruck 4', foodTruck4Location);
      const foodTruck5Location = st.setSRID((st.makePoint(4.394373, 50.823743)), 4326);
      const foodTruck5 = new FoodTruck(-1, 'FoodTruck 5', foodTruck5Location);
      // Inserts seed entries
      return knex('foodTruck').insert([
        { name: foodTruck1.name, currentLocation: foodTruck1.currentLocation },
        { name: foodTruck2.name, currentLocation: foodTruck2.currentLocation },
        { name: foodTruck3.name, currentLocation: foodTruck3.currentLocation },
        { name: foodTruck4.name, currentLocation: foodTruck4.currentLocation },
        { name: foodTruck5.name, currentLocation: foodTruck5.currentLocation },
      ]);
    });
};

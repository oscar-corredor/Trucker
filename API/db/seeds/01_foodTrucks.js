const knexPostgis = require('knex-postgis');
const FoodTruck = require('../../entities/foodTruck');

exports.seed = (knex, Promise) => {
  // install
  const st = knexPostgis(knex);

  // Deletes ALL existing entries
  return knex('foodTruck').del()
    .then(() => {
      const foodTruck1Location = st.setSRID((st.makePoint(-99.147315, 19.377865)), 4326);
      const foodTruck1 = new FoodTruck(-1, '1.dentro de 1km', foodTruck1Location);
      const foodTruck2Location = st.setSRID((st.makePoint(-99.142766, 19.374707)), 4326);
      const foodTruck2 = new FoodTruck(-1, '2.dentro de 1km', foodTruck2Location);
      const foodTruck3Location = st.setSRID((st.makePoint(-99.154031, 19.375213)), 4326);
      const foodTruck3 = new FoodTruck(-1, '3.dentro de 1km', foodTruck3Location);
      const foodTruck4Location = st.setSRID((st.makePoint(-99.154928, 19.358859)), 4326);
      const foodTruck4 = new FoodTruck(-1, '4.fuera de 1km', foodTruck4Location);
      const foodTruck5Location = st.setSRID((st.makePoint(-99.164699, 19.360350)), 4326);
      const foodTruck5 = new FoodTruck(-1, '5.fuera de 1km', foodTruck5Location);
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

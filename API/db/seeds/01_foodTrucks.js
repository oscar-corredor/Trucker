const FoodTruck = require('../../entities/foodTruck');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('foodTruck').del()
    .then(() => {
      const foodTruck1 = new FoodTruck(-1, 'FoodTruck 1');
      const foodTruck2 = new FoodTruck(-1, 'FoodTruck 2');
      const foodTruck3 = new FoodTruck(-1, 'FoodTruck 3');
      const foodTruck4 = new FoodTruck(-1, 'FoodTruck 4');
      const foodTruck5 = new FoodTruck(-1, 'FoodTruck 5');
      // Inserts seed entries
      return knex('foodTruck').insert([
        { name: foodTruck1.name },
        { name: foodTruck2.name },
        { name: foodTruck3.name },
        { name: foodTruck4.name },
        { name: foodTruck5.name },
      ]);
    });
};

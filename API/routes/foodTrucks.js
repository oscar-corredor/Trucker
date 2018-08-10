const express = require('express');
const foodTrucksStore = require('../db/stores/foodTruckStore');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const foodTrucks = await foodTrucksStore.getAllFoodTrucks();
    res.status(200).send(foodTrucks);
  } catch (error) {
    next(error);
  }
});


module.exports = router;

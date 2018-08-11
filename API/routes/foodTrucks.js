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

router.get('/:foodTruckId', async (req, res, next) => {
  try {
    const { foodTruckId } = req.params;
    const foodTruck = await foodTrucksStore.getFoodTruckFromId(foodTruckId);
    if (foodTruck) {
      res.status(200).send(foodTruck);
    } else res.status(404).send('Not Found');
  } catch (error) {
    next(error);
  }
});


module.exports = router;

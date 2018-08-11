const express = require('express');
const foodTrucksStore = require('../db/stores/foodTruckStore');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const foodTrucks = await foodTrucksStore.getAllFoodTrucks();
    res.status(200).send(foodTrucks);
  } catch (error) {
    next(error.message);
  }
});

router.get('/:foodTruckId', async (req, res, next) => {
  try {
    const { foodTruckId } = req.params;
    console.log(`getting foodtruck: ${foodTruckId}`);
    const foodTruck = await foodTrucksStore.getFoodTruckFromId(foodTruckId);
    if (foodTruck) {
      res.status(200).send(foodTruck);
    } else res.status(404).send('Not Found');
  } catch (error) {
    next(error.message);
  }
});

router.patch('/:foodTruckId', async (req, res, next) => {
  try {
    const { foodTruckId } = req.params;
    const foodTruckUpdated = await foodTrucksStore.updateFoodTruckLocation(foodTruckId, req.body);
    if (foodTruckUpdated) {
      res.status(200).send(foodTruckUpdated);
    } else res.status(404).send('Not Found');
  } catch (error) {
    console.log(error);
    next(error.message);
  }
});


module.exports = router;

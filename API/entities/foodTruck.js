/**
 * Class that represents a foodtruck entity
 * @class
 */
module.exports = class FoodTruck {
  constructor(id, name, currentLocation) {
    this.id = id;
    this.name = name;
    this.currentLocation = currentLocation;
  }

  static verifyRowObject(rowObject) {
    return rowObject.id && rowObject.name;
  }
};

/**
 * Class that represents a foodtruck entity
 * @class
 */
module.exports = class FoodTruck {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static verifyRowObject(rowObject) {
    return rowObject.id && rowObject.name;
  }
};

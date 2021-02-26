const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
} = require('../lib/zookeepers');

const { zookeepers } = require('../data/zookeepers.json');
const { TestScheduler } = require("jest");
const { create } = require("domain");
const { hasUncaughtExceptionCaptureCallback } = require("process");

jest.mock('fs');

test("creates an animal object", () => {
  const reqBody = { name: "Darlene", age: 30, favoriteAnimal: "monkey", id: "888" };
  const zookeeper = createNewZookeeper(reqBody, zookeepers);
  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.age).toBe(30);
  expect(zookeeper.favoriteAnimal).toBe("monkey");
  expect(zookeeper.id).toBe("888");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const filteredZookeepers = filterByQuery({ age: 67 }, startingZookeepers);
  expect(filteredZookeepers.length).toEqual(1);
  expect(filteredZookeepers[0].name).toBe("Isabella");
});

test("finds by id", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];
  const result = findById("2", startingZookeepers);
  expect(result.name).toBe("Raksha");
});

test("validates age", () => {
  const validZookeeper = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
  };
  const invalidZookeeper = {
    id: "2",
    name: "Raksha",
    age: "31",
    favoriteAnimal: "penguin",
  };

  const valid = validateZookeeper(validZookeeper);
  const invalid = validateZookeeper(invalidZookeeper);

  expect(valid).toBe(true);
  expect(invalid).toBe(false);
});
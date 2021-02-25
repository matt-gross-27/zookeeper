const { response } = require("express");
const fs = require("fs");
const { animals } =require("../data/animals")

const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal
} = require ('../lib/animals');

jest.mock('fs');

test("creates an animal object", () => {
  const animal = createNewAnimal(
    { 
      name: "Darlene",
      id: "jgdja3ng2",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    }, 
      animals
  );
  expect(animal.name).toBe("Darlene");
  expect(animal.id).toBe("jgdja3ng2");
});

test("filters by query", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);
  expect(updatedAnimals.length).toEqual(1);
});

test("finds by id", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const result = findById("3", startingAnimals);

  expect(result.name).toBe("Erica");
});

test("validates personality traits", () => {
  const animal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
    personalityTraits: ["quirky", "rash"],
  };

  const invalidAnimal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
  };

  const result1 = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  expect(result1).toBe(true);
  expect(result2).toBe(false);
});
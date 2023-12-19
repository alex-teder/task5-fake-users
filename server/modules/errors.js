import { faker } from "@faker-js/faker";

export function errorize(fake, errorValue, seed) {
  faker.seed(seed);
  const errorQty = Math.floor(errorValue);
  const errorProbability = errorValue - errorQty;
  for (let i = 0; i < errorQty; i++) {
    insertError(fake);
  }
  faker.helpers.maybe(
    () => {
      insertError(fake);
    },
    { probability: errorProbability }
  );
}

function insertError(fake) {
  const KEYS = ["name", "email", "phone", "address"];
  const ERRORS = [deleteChar, swapChars, insertChar];

  const key = faker.helpers.arrayElement(KEYS);
  const fn = faker.helpers.arrayElement(ERRORS);
  fake[key] = fn(fake[key]);
}

function deleteChar(str) {
  const indexToDelete = faker.number.int({ min: 0, max: str.length - 1 });
  return str.slice(0, indexToDelete) + str.slice(indexToDelete + 1);
}

function swapChars(str) {
  const rightIndex = faker.number.int({ min: 1, max: str.length - 1 });
  const leftIndex = rightIndex - 1;
  return str.slice(0, leftIndex) + str[rightIndex] + str[leftIndex] + str.slice(rightIndex + 1);
}

function insertChar(str) {
  const char = faker.string.sample(1);
  const indexToInsert = faker.number.int({ min: 0, max: str.length });
  return str.slice(0, indexToInsert) + char + str.slice(indexToInsert);
}

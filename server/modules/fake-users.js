import all_the_cities from "all-the-cities";
import { fakerKA_GE, fakerFR, fakerFI, fakerIT, fakerDE } from "@faker-js/faker";
import latinize_georgian from "latinize-georgian";
import { RequestError } from "./request-error.js";
import { errorize } from "./errors.js";

const fakersMap = {
  DE: fakerDE,
  FR: fakerFR,
  IT: fakerIT,
  FI: fakerFI,
  GE: fakerKA_GE,
};

const translitMap = {
  GE: latinize_georgian,
};

function getCitiesList(countryCode, minPopulation = 20000) {
  return all_the_cities.filter(
    ({ country, population }) => country.match(countryCode) && population > minPopulation
  );
}

export function getFakes({ location, seed, page, errorValue = 0, itemsPerPage }) {
  if (!fakersMap[location]) throw new RequestError("Unknown location");
  const citiesList = getCitiesList(location);
  const seedForPage = seed + page;
  return Array.from({ length: itemsPerPage }, (_, idx) => {
    const seedForItem = seedForPage * itemsPerPage + idx;
    const indexForItem = page * itemsPerPage + idx + 1;
    const fake = createSingleLocalizedFake({ location, citiesList, seed: seedForItem });
    errorize(fake, errorValue, seedForItem);
    return { ...fake, idx: indexForItem };
  });
}

function createSingleLocalizedFake({ location, citiesList, seed }) {
  return createSingleFake({
    faker: fakersMap[location],
    translitFn: translitMap[location],
    citiesList,
    seed,
  });
}

function createSingleFake({ faker, seed, citiesList, translitFn }) {
  faker.seed(seed);
  const { name, firstName, lastName } = createName({ faker });
  const email = createEmail({ faker, firstName, lastName, translitFn });
  const address = createAddress({ faker, citiesList, translitFn });
  const phone = faker.phone.number();
  const id = faker.string.uuid();
  return { id, name, email, phone, address };
}

function createName({ faker }) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const name = firstName + " " + lastName;
  return { name, firstName, lastName };
}

function createEmail({ faker, firstName, lastName, translitFn }) {
  return faker.internet
    .email({
      firstName: translitFn ? translitFn(firstName) : firstName,
      lastName: translitFn ? translitFn(lastName) : lastName,
    })
    .toLowerCase();
}

function createAddress({ faker, citiesList, translitFn }) {
  const randomIndex = faker.number.int({ min: 0, max: citiesList.length - 1 });
  const city = citiesList[randomIndex].name;
  const streetAddress = translitFn
    ? translitFn(faker.location.streetAddress())
    : faker.location.streetAddress();
  return [city, streetAddress].join(", ");
}

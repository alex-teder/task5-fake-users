export function getRandomSeed() {
  return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
}

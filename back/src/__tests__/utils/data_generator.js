import { readJsonFile } from './readJson.js';

const categories = readJsonFile(
  'src/__tests__/in_memory_db/data/categories.json',
);
const products = readJsonFile('src/__tests__/in_memory_db/data/products.json');
const users = readJsonFile('src/__tests__/in_memory_db/data/users.json');

const randomCategory = () => categories[getRandomIndex(categories.length)];
const randomProduct = () => products[getRandomIndex(products.length)];
const randomUser = () => users[getRandomIndex(users.length)];

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

export { randomCategory, randomProduct, randomUser };

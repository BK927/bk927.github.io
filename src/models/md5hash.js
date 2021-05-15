export function generateHash(object){
  const hash = require('object-hash');
  return hash(object);
}
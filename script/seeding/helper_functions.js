const getRandomBoolean = (probability = 0.5) => {
  return Math.random() < probability
}
const getRandomInteger = max => {
  return Math.floor(Math.random() * max)
}
const getRandomDecimal = max => {
  return Math.random() * max
}
const getRandomElement = array => {
  return array[Math.floor(Math.random() * array.length)]
}
const getRandomSubarray = array => {
  const uniqueValues = new Set()
  const maxSize = Math.ceil(Math.random() * array.length)
  for (let i = 0; i < maxSize; i++) {
    uniqueValues.add(getRandomElement(array))
  }
  return Array.from(uniqueValues)
}

module.exports = {
  getRandomBoolean,
  getRandomInteger,
  getRandomDecimal,
  getRandomElement,
  getRandomSubarray
}

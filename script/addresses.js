const {Address} = require('../server/db/models')

const names = [
  'Cherry Tree',
  'Lexington',
  'Houston',
  'Frederick Douglass',
  'Elm',
  'Madison',
  'Park',
  'Varick',
  'Stone Creek',
  'Newport',
  'Woodstock',
  'Fairway',
  'Crescent',
  'Sea View',
  'Stapleton',
  'Springwood',
  'Ludlow',
  'Upper Duck Pond',
  'Lower Duck Pond',
  'Levine',
  'Northampton',
  'Mead',
  'Sussex',
  'Oakland',
  'Primrose'
]
const descriptors = [
  'Gardens',
  'Street',
  'Lane',
  'Way',
  'Court',
  'Circle',
  'Point',
  'Ridge',
  'Close',
  'Road',
  'Green',
  'Avenue'
]

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Miami',
  'Dallas',
  'Philadelphia',
  'Houston',
  'Atlanta',
  'Washington',
  'Boston',
  'Phoenix',
  'Seattle',
  'San Francisco',
  'Detroit',
  'San Diego',
  'Minneapolis',
  'Tampa',
  'Denver',
  'Riverside',
  'Baltimore',
  'Las Vegas',
  'Portland',
  'San Antonio',
  'St. Louis',
  'Sacramento',
  'Orlando',
  'San Jose',
  'Cleveland',
  'Pittsburgh',
  'Austin',
  'Cincinnati',
  'Kansas City',
  'Indianapolis',
  'Columbus',
  'Charlotte',
  'Virginia Beach',
  'Milwaukee'
]

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
]

const getRandomHouseNumber = () => Math.floor(Math.random() * 1000)
const getRandomStreetName = () => {
  const streetName =
    names[Math.floor(Math.random() * names.length)] +
    ' ' +
    descriptors[Math.floor(Math.random() * descriptors.length)]
  return streetName
}
const getRandomCity = () => cities[Math.floor(Math.random() * cities.length)]
const getRandomState = () => states[Math.floor(Math.random() * states.length)]
const getRandomZipCode = () => Math.floor(Math.random() * 90000) + 10000

async function addressSeed() {
  for (let i = 0; i < 100; i++) {
    await Address.create({
      houseNumber: getRandomHouseNumber(),
      streetName: getRandomStreetName(),
      city: getRandomCity(),
      state: getRandomState(),
      zipCode: getRandomZipCode()
    })
  }

  console.log(`seeded successfully`)
}

module.exports = addressSeed

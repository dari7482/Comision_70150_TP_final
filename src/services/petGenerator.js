import { faker } from "@faker-js/faker"
import { types, dogBreeds, catBreeds } from "../utils/pets.js"

export const petGenerator = () => {
    const type = faker.helpers.arrayElement(types)
    const breed = type === 'Dog' ? faker.helpers.arrayElement(dogBreeds) : faker.helpers.arrayElement(catBreeds)
    return {
        // _id: faker.database.mongodbObjectId(),
        name: faker.animal.type(),
        specie: type,
        birthDate: faker.date.past(20),
        adopted: false,
        owner: null,
        age: faker.number.int({ min: 1, max: 20 }),
        //type: type,        
        image: null
    }
}
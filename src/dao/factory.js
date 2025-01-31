import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config()
const MONGO_URL = process.env.MONGO_URL
const persistence = process.env.persistence

export let Contacts;
export let Pets
export let Addoption


async function initializeContacts() {
    switch (persistence) {
        case "MONGO":
            await mongoose.connect(MONGO_URL);
            const { default: UserModel } = await import('./mongo/user.mongo.js');
            const { default: PetModel } = await import('./mongo/pet.mongo.js')
            const { default: AdoptModel } = await import('./mongo/adoption.mongo.js')
            Contacts = UserModel
            Pets = PetModel
            Addoption = AdoptModel

            break;
        case "MEMORY":

            const { default: UserMemory } = await import("./memory/userMocks.memory.js");
            const { default: PetMemory } = await import("./memory/petMocks.memory.js");
            const { default: AdoptMemory } = await import("./memory/adoptMocks.memory.js");
            Contacts = UserMemory;
            Pets = PetMemory
            Addoption = AdoptMemory


            break;
        default:
            throw new Error("No valid persistence option specified");
    }
}

await initializeContacts()
import { expect } from "chai"
import { describe, it } from "mocha"
import mongoose from "mongoose"
import supertest from "supertest"
import { config } from "../src/config/config.js"


const PORT = config.PORT
const MONGO_URL = config.MONGO_URL



await mongoose.connect(MONGO_URL)


const requester = supertest(`http://localhost:${PORT}`)

describe("Pruebas router Adoptions", function () {
    this.timeout(10000);

    let adoptionId;

    before(async () => {

        await mongoose.connection.collection("pets").insertOne({
            name: "FirulaisTest",
            specie: "DOG",
            birthDate: new Date("2020-05-01"),
            adopted: false,
        });

        await mongoose.connection.collection("users").insertOne({
            first_name: "JuanTest",
            last_name: "Pérez",
            email: "juan.Test@example.com",
            password: "123456",
            role: "user",
            pets: [],
            documents: []

        });
    });



    after(async () => {
        await mongoose.connection.collection("pets").deleteMany({
            name: "FirulaisTest"
        })

        await mongoose.connection.collection("users").deleteMany({
            first_name: "JuanTest"
        })


        await mongoose.connection.collection("adoptions").deleteMany({
            owner: new mongoose.Types.ObjectId("6792511ab9b722804138a39c")
        });



    });

    it("La ruta /api/adoptions/ devuelve todas las adopciones", async () => {

        let { body, status } = await requester.get("/api/adoptions/");
        expect(status).to.be.eq(200);
        expect(body.status).to.be.eq("success");
        expect(body.payload).to.be.an("array");
    });



    it("La ruta /api/adoptions/:aid/pet:ID crea una adopcion, verifica el statu y revisa que contenga las prop owner y pet que sean obj_id", async () => {
        let userid = await mongoose.connection.collection("users").findOne({
            first_name: "JuanTest"
        })
        let petid = await mongoose.connection.collection("pets").findOne({
            name: "FirulaisTest"
        })

        let { status, body } = await requester.post(`/api/adoptions/${userid._id.toString()}/${petid._id.toString()}`);
        adoptionId = body.payload._id;


        expect(status).to.be.eq(201);
        expect(body.status).to.be.eq("success");
        expect(body.payload).to.have.property("owner").that.is.a("string").and.match(/^[0-9a-fA-F]{24}$/);
        expect(body.payload).to.have.property("pet").that.is.a("string").and.match(/^[0-9a-fA-F]{24}$/);



    });

    it("La ruta /api/adoptions/id devuelve una adopción existente", async () => {

        let { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);
        expect(status).to.be.eq(200);
        expect(body.status).to.be.eq("success");
        expect(body.payload).not.to.be.an("array").that.is.empty;



    });




    it("La ruta /api/adoptions/:aid retorna 404 si la adopción no existe", async () => {

        let { status, body } = await requester.get(`/api/adoptions/6795235ccf7a5e0e1c154f3`);
        expect(status).to.be.eq(404);
        expect(body.status).to.be.eq("error");
        expect(body.error).to.be.eq("Adoption not found");
        expect(body.payload).to.be.an("array").that.is.empty;
    });

});



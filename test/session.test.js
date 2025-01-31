import { expect } from "chai"
import { describe, it } from "mocha"
import mongoose from "mongoose"
import supertest from "supertest"
import { config } from "../src/config/config.js"


const PORT = config.PORT
const MONGO_URL = config.MONGO_URL



await mongoose.connect(MONGO_URL)


const requester = supertest(`http://localhost:${PORT}`)


describe("Pruebas sessions", async function () {
    this.timeout(18000)

    let cookie
    let userMock = { first_name: "Juan", last_name: "Lopez", email: "test@test.com", password: "123" }

    after(async () => {

        await mongoose.connection.collection("users").deleteMany({ email: "test@test.com" })
    })

    it("La ruta /api/sessions/register, si recibe un usuario valido, lo da de alta en DB", async () => {

        let { body, status } = await requester.post("/api/sessions/register").send(userMock)



        expect(body.status).to.be.ok

    })

    it("Con un usuario previamente registrado, enviado a la ruta /api/sessions/login, puedo acceder al sistema, y se genera una cookie", async () => {
        let { body, header } = await requester.post("/api/sessions/login").send(userMock)



        let cookies = header["set-cookie"]
        cookie = header["set-cookie"][0]

        let nombreCookie = cookies[0].split("=")[0]


        expect(body.status).to.be.ok
        expect(nombreCookie).to.be.eq("coderCookie")

    })

    it("Si envío una peticion post a /api/sessions/current, con una cookie coderCookie conteniendo un token valido, responde los datos del usuario", async () => {
        let { body, header } = await requester.get("/api/sessions/current").set("Cookie", cookie)


        expect(body.status).to.be.ok
        expect(body.payload.email).to.be.eq(userMock.email)

    })

    it("La ruta /api/sessions/register, si recibe un usuario sin email, retorna un status 400", async () => {
        let userMock2 = { first_name: "Juan", last_name: "Lopez", password: "123" }
        let { status } = await requester.post("/api/sessions/register").send(userMock2)


        expect(status).to.be.eq(400)

    })
    it("La ruta /api/sessions/logout, si no se pasa una cookie válida, debe devolver un error 401", async () => {


        let { status, body, header } = await requester.post("/api/sessions/logout")

        expect(status).to.be.eq(401)
        expect(body.status).to.be.eq("error")
        expect(body.payload).to.include("jwt must be provided")
    })
})

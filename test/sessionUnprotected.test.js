import { expect } from "chai"
import { describe, it } from "mocha"
import mongoose from "mongoose"
import supertest from "supertest"
import { config } from "../src/config/config.js"


const PORT = config.PORT
const MONGO_URL = config.MONGO_URL



await mongoose.connect(MONGO_URL)


const requester = supertest(`http://localhost:${PORT}`)


describe("Pruebas sessions unprotectedLogin", async function () {
    this.timeout(18000)


    let userMock = { first_name: "Juan", last_name: "Lopez", email: "test@test.com", password: "123" }
    let userInvalid = { email: "invalid@test.com", password: "wrongpass" }

    before(async () => {
        let { body, status } = await requester.post("/api/sessions/register").send(userMock)
        expect(status).to.be.ok
    })

    after(async () => {
        await mongoose.connection.collection("users").deleteMany({ email: "test@test.com" })
    })

    it("La ruta /api/sessions/unprotectedLogin, si recibe un email y password válidos, devuelve un token y una cookie", async () => {
        let { body, status, header } = await requester.post("/api/sessions/unprotectedLogin").send(userMock)


        expect(status).to.be.ok
        expect(body.status).to.be.eq("success")
        expect(body.message).to.be.eq("Unprotected Logged in")


        let cookies = header["set-cookie"]
        let cookieExists = cookies && cookies.some(c => c.includes("unprotectedCookie"))
        expect(cookieExists).to.be.true
    })

    it("La ruta /api/sessions/unprotectedLogin, si no recibe un email o password, debe devolver un error 400", async () => {
        let userMockIncomplete = { email: "test@test.com" }
        let { status, body } = await requester.post("/api/sessions/unprotectedLogin").send(userMockIncomplete)

        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq("error")
        expect(body.error).to.be.eq("Incomplete values")
    })

    it("La ruta /api/sessions/unprotectedLogin, si el usuario no existe, debe devolver un error 404", async () => {
        let { status, body } = await requester.post("/api/sessions/unprotectedLogin").send(userInvalid)

        expect(status).to.be.eq(404)
        expect(body.status).to.be.eq("error")
        expect(body.error).to.be.eq("User doesn't exist")
    })

    it("La ruta /api/sessions/unprotectedLogin, si la contraseña es incorrecta, debe devolver un error 400", async () => {
        let userMockInvalidPass = { email: "test@test.com", password: "wrongpassword" }
        let { status, body } = await requester.post("/api/sessions/unprotectedLogin").send(userMockInvalidPass)

        expect(status).to.be.eq(400)
        expect(body.status).to.be.eq("error")
        expect(body.error).to.be.eq("Incorrect password")
    })
})

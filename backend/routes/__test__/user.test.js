const request = require("supertest");
const { app } = require("../../server");

describe("Authentication test", () => {
    describe("Sign up test", () => {
        it("returns a 201 on successful signup", async () => {
            return request(app)
                .post("/api/users")
                .send({
                    name: "Test",
                    email: "test@test.com",
                    phone: "123",
                    password: "password",
                })
                .expect(201);
        });

        it("returns a 400 with an invalid email", async () => {
            return request(app)
                .post("/api/users")
                .send({
                    name: "Test",
                    email: "123",
                    phone: "123",
                    password: "password",
                })
                .expect(400);
        });

        it("returns a 400 with missing email and password", async () => {
            await request(app)
                .post("/api/users")
                .send({
                    email: "test@test.com",
                })
                .expect(400);

            await request(app)
                .post("/api/users")
                .send({
                    password: "123",
                })
                .expect(400);
        });

        it("disallows duplicate emails", async () => {
            await request(app)
                .post("/api/users")
                .send({
                    name: "Test",
                    email: "test@test.com",
                    phone: "123",
                    password: "password",
                })
                .expect(201);

            await request(app)
                .post("/api/users")
                .send({
                    name: "Test",
                    email: "test@test.com",
                    phone: "123",
                    password: "password",
                })
                .expect(400);
        });

        it("sets a cookie after successful signup", async () => {
            const response = await request(app)
                .post("/api/users")
                .send({
                    name: "Test",
                    email: "test@test.com",
                    phone: "123",
                    password: "password",
                })
                .expect(201);

            expect(response.headers["set-cookie"]).toBeDefined();
        });
    });

    describe("Sign in test", () => {
        it("fails when a email that does not exist is supplied", async () => {
            await request(app)
                .post("/api/users/auth")
                .send({
                    email: "test@test.com",
                    password: "password",
                })
                .expect(401);
        });

        it("fails when an incorrect password is supploed", async () => {
            await global.signin();

            await request(app)
                .post("/api/users/auth")
                .send({
                    email: "test@test.com",
                    password: "123",
                })
                .expect(401);
        });

        it("responds with a cookie when given valid credentials", async () => {
            await global.signin();

            const response = await request(app)
                .post("/api/users/auth")
                .send({
                    email: "test@test.com",
                    password: "password",
                })
                .expect(200);

            expect(response.get("Set-Cookie")).toBeDefined();
        });
    });

    describe("Sign out test", () => {
        it("clear the cookie after signing out", async () => {
            await global.signin();

            const response = await request(app)
                .post("/api/users/logout")
                .send({})
                .expect(200);

            expect(response.get("Set-Cookie")[0]).toEqual(
                "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
            );
        });
    });

    describe("Current user test", () => {
        it("responds with details about the current user", async () => {
            const cookie = await global.signin();

            const response = await request(app)
                .get("/api/users/profile")
                .set("Cookie", cookie)
                .send()
                .expect(200);
        });

        it("responds with 401 status if not authenticated", async () => {
            const response = await request(app)
                .get("/api/users/profile")
                .send()
                .expect(401);
        });
    });
});

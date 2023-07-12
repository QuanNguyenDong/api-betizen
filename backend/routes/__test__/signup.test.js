const request = require("supertest");
const { app } = require("../../server");

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

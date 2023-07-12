const request = require('supertest');
const { app } = require('../../server');

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
    await global.signin()

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

    expect(response.get('Set-Cookie')).toBeDefined();
})

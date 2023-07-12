const request = require('supertest');
const { app } = require('../../server');

it("clear the cookie after signing out", async () => {
    await global.signin();

    const response = await request(app)
        .post('/api/users/logout')
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual(
        "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
    )
})
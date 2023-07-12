const request = require('supertest');
const { app } = require('../../server');

it('responds with details about the current user', async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/profile')
        .set('Cookie', cookie)
        .send()
        .expect(200);
});

it("responds with 401 status if not authenticated", async () => {
    const response = await request(app)
        .get('/api/users/profile')
        .send()
        .expect(401);
});

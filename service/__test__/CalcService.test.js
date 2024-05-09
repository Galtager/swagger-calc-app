const { getAuthToken } = require('../../test/setup.js')
const { app } = require('../..');
const request = require('supertest');


it('has route handler listening to /calc for post request', async () => {
    const res = await request(app)
        .post('/calc')
        .send({})
    expect(res.status).not.toBe(404);
})
it('can only be accessed if the user is authenticated', async () => {
    const res = await request(app)
        .post('/calc')
        .send({})
    expect(res.status).toBe(401);
})
it('return a status other then 401 if the user has authenticated ', async () => {
    const token = getAuthToken();
    const res = await request(app)
        .post('/calc')
        .set('Authorization', `Bearer ${token}`)
        .send({});
    expect(res.status).not.toBe(401)
})
it('returns error if is missing body parameters', async () => {
    const token = getAuthToken();
    await request(app)
        .post('/calc')
        .set('Authorization', `Bearer ${token}`)
        .set('op', 'add')
        .send({
            num1: 10
        }).expect(400);
    await request(app)
        .post('/calc')
        .set('Authorization', `Bearer ${token}`)
        .set('op', 'add')
        .send({
            num2: 10
        }).expect(400)
})
it('returns error if is missing operation header', async () => {
    const token = getAuthToken();
    await request(app)
        .post('/calc')
        .set('Authorization', `Bearer ${token}`)
        .send({
            num1: 10,
            num2: 20
        }).expect(400);
})
it('returns error if is wronge inputs is provided', async () => {
    const token = getAuthToken();
    await request(app)
        .post('/calc')
        .set('Authorization', `Bearer ${token}`)
        .set('op', 'add')
        .send({
            num1: "21",
            num2: "1asd"
        }).expect(400);
    await request(app)
        .post('/calc')
        .set('Authorization', `Bearer ${token}`)
        .set('op', 'add')
        .send({
            num1: "sadsa",
            num2: "12"
        }).expect(400);
    await request(app)
        .post('/calc')
        .set('Authorization', `Bearer ${token}`)
        .set('op', 'test')
        .send({
            num1: 22,
            num2: 13
        }).expect(400);
})
it('returns error if trying to divide with zero ', async () => {
    const token = getAuthToken();
    await request(app)
        .post('/calc')
        .set('Authorization', `Bearer ${token}`)
        .set('op', 'div')
        .send({
            num1: 22,
            num2: 0
        }).expect(400)
})
it('returns result in body when success ', async () => {
    const token = getAuthToken();
    const response = await request(app)
        .post('/calc')
        .set('Authorization', `Bearer ${token}`)
        .set('op', 'div')
        .send({
            num1: 22,
            num2: 2
        });
    expect(response.body.result).toBe(11)
})
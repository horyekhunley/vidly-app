const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/api/v1/genres');
    expect(response.status).toBe(200);
  });
});

describe('POST /api/v1/genres', () => {
  it('should return 201 Created', async () => {
    const response = await request(app).post('/api/v1/genres').send({name: 'Action'});
    expect(response.status).toBe(201);
  });
});

describe('PUT /api/v1/genres', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).put('/api/v1/genres/:id').send({name: 'Action'});
    expect(response.status).toBe(200);
  });
});

describe('DELETE /api/v1/genres', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).delete('/api/v1/genres/:id');
    expect(response.status).toBe(200);
  });
});

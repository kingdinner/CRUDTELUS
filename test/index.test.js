const request = require('supertest');
const {app, users} = require('../index');

describe('User API', () => {
  let userId;

  let usersData = [
    { id: '0', name: 'John Doe', email: 'john@example.com' },
    { id: '1', name: 'Jane Smith', email: 'jane@example.com' }
  ];
  beforeAll(() => {
    // push the users to the index.js before started
    users.push(...usersData);
  });

  it('should retrieve all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(usersData);
  });

  it('should retrieve a specific user based on userId', async () => {
    const response = await request(app).get('/users/0');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
  });

  it('should return 404 when retrieving a non-existent user if there is no userid', async () => {
    const response = await request(app).get('/users/3');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should create a new user', async () => {
    const newUser = { name: 'John Doe', email: 'Borbe@example.com' };
    const response = await request(app).post('/users').send(newUser).set('Content-Type', 'application/json');
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    userId = response.body.id;
  });

  it('should update an existing user', async () => {
    const updatedUser = { name: 'John Doe', email: 'Borbe.doe@example.com' };
    const response = await request(app).put(`/users/${userId}`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('Borbe.doe@example.com');
  });

  it('should return 404 when updating a non-existent user', async () => {
    const updatedUser = { name: 'John Doe', email: 'john.doe@example.com' };
    const response = await request(app).put('/users/3').send(updatedUser);
    expect(response.error.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });

  it('should delete an existing user', async () => {
    const response = await request(app).delete(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
  });

  it('should return 404 when deleting a non-existent user', async () => {
    const response = await request(app).delete('/users/3');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
  });
});

import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint response', ()=> {
  it('gets the api endpoint', async ()=> {
    const response = await request.get('/api/images?filename=fjord&width=200&height=200');
    expect(response.status).toBe(200);
  });

  it('the api endpoint returns a 404 error when the path does not match', async ()=> {
    const response = await request.get('/api/images?filename=random&width=200&height=200');
    expect(response.status).toBe(404);
  });
});
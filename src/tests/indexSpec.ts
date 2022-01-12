import supertest from 'supertest';
import app from '../index';
import { Utils } from '../utility/Utils';
import path from 'path';

const request = supertest(app);

const IMAGES = path.join(__dirname, '../../assets/');

describe('Test endpoint response', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api/images?filename=fjord&width=200&height=200');
    expect(response.status).toBe(200);
  });

  it('the api endpoint returns a 404 error when the path does not match', async () => {
    const response = await request.get('/api/images?filename=random&width=200&height=200');
    expect(response.status).toBe(404);
  });

  it('the api endpoint returns a 401 error', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(401);
  });

  it('Expects async resize function to work', async () => {
    await expectAsync(Utils.resizeFile(IMAGES + 'fjord.jpg', IMAGES + 'fjord_thumb.jpg', 100, 100)).toBeResolved();
  });
});

import request from 'supertest';
import { application, ShutDown } from '../../src/server.js';

describe('The application', () => {
  afterAll((done) => {
    ShutDown(done);
  });

  it('starts and has the proper test environment', async () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(application).toBeDefined();
  }, 10000);
});

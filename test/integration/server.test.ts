import request from 'supertest';
import { application, ShutDown } from '../../src/server.js';
import { describe, it, expect, afterAll } from 'vitest';

describe('The application', () => {
  afterAll(async () => {
    await new Promise<void>((resolve) => ShutDown(resolve));
  });

  it('starts and has the proper test environment', async () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(application).toBeDefined();
  }, 10000);

  it('Returns all options allowed to be called by users (http methods)', async () => {
    const response = await request(application).options('/');

    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-methods']).toBe('PUT, POST, PATCH, DELETE, GET');
  });
});

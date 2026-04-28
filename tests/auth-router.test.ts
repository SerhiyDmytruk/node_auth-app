import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';

describe('authRouter', () => {
  it('responds to registration requests', async () => {
    const response = await request(app).post('/registration');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello!');
  });
});

import { describe, expect, it, vi } from 'vitest';
import { authController } from '../src/controllers/authController.js';

const createResponse = () => {
  const status = vi.fn().mockReturnThis();
  const json = vi.fn();

  return { status, json };
};

describe('authController', () => {
  it('returns 400 when name is missing', () => {
    const response = createResponse();

    authController.registration(
      {
        body: {
          email: 'test@example.com',
          password: '12345678',
          confirmPassword: '12345678',
        },
      } as never,
      response as never,
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Name must be a string',
    });
  });

  it('returns 400 when passwords do not match', () => {
    const response = createResponse();

    authController.registration(
      {
        body: {
          name: 'John Doe',
          email: 'test@example.com',
          password: '12345678',
          confirmPassword: '87654321',
        },
      } as never,
      response as never,
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Passwords do not match',
    });
  });

  it('returns 200 when registration payload is valid', () => {
    const response = createResponse();

    authController.registration(
      {
        body: {
          name: '  John Doe  ',
          email: ' test@example.com ',
          password: '12345678',
          confirmPassword: '12345678',
        },
      } as never,
      response as never,
    );

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Registration data is valid.',
      data: {
        email: 'test@example.com',
        name: 'John Doe',
      },
    });
  });
});

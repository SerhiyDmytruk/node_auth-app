import { describe, expect, it, vi } from 'vitest';
import { loginController } from '../src/controllers/loginController.js';

describe('loginController', () => {
  it('returns 400 when email is missing', () => {
    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const response = { status, json };

    loginController.login(
      {
        body: {
          password: '12345678',
        },
      } as never,
      response as never,
    );

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      message: 'Email must be a string',
    });
  });

  it('returns 200 when login payload is valid', () => {
    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const response = { status, json };

    loginController.login(
      {
        body: {
          email: ' test@example.com ',
          password: '12345678',
        },
      } as never,
      response as never,
    );

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      message: 'Login payload is valid.',
      data: {
        email: 'test@example.com',
      },
    });
  });
});

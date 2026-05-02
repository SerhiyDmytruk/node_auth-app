import { describe, expect, it, vi } from 'vitest';
import { logoutController } from '../src/controllers/logoutController.js';

const createResponse = () => {
  const status = vi.fn().mockReturnThis();
  const json = vi.fn();
  const clearCookie = vi.fn();

  return { status, json, clearCookie };
};

describe('logoutController', () => {
  it('returns 401 when auth context is missing', () => {
    const response = createResponse();

    logoutController.logout(
      {
        headers: {},
        cookies: {},
      } as never,
      response as never,
    );

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Authentication is required',
    });
  });

  it('returns 200 and clears cookie when auth context is present', () => {
    const response = createResponse();

    logoutController.logout(
      {
        headers: {
          authorization: 'Bearer token',
        },
        cookies: {},
      } as never,
      response as never,
    );

    expect(response.clearCookie).toHaveBeenCalledWith('refreshToken');
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Logout request is valid.',
    });
  });
});

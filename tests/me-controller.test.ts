import { describe, expect, it, vi } from 'vitest';
import { meController } from '../src/controllers/meController.js';

const createResponse = () => {
  const status = vi.fn().mockReturnThis();
  const json = vi.fn();

  return { status, json };
};

describe('meController', () => {
  it('returns 401 when auth context is missing', () => {
    const response = createResponse();

    meController.me(
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

  it('returns 200 when auth context is present', () => {
    const response = createResponse();

    meController.me(
      {
        headers: {
          authorization: 'Bearer token',
        },
        cookies: {},
      } as never,
      response as never,
    );

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Authentication context is present.',
      data: {
        authenticated: true,
      },
    });
  });
});

import { describe, expect, it, vi } from 'vitest';
import { authController } from '../src/controllers/route.controller.js';

describe('authController', () => {
  it('sends greeting on registration', () => {
    const send = vi.fn();
    const response = { send };

    authController.registration({} as never, response as never);

    expect(send).toHaveBeenCalledWith('Hello!');
  });
});

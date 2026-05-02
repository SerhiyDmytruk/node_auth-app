import { beforeEach, describe, expect, it, vi } from 'vitest';
import bcrypt from 'bcrypt';
import { prisma } from '../src/lib/prisma.js';
import { authController } from '../src/controllers/authController.js';

vi.mock('../src/lib/prisma.js', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
  },
}));

const createResponse = () => {
  const status = vi.fn().mockReturnThis();
  const json = vi.fn();

  return { status, json };
};

describe('authController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when name is missing', async () => {
    const response = createResponse();

    await authController.registration(
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

  it('returns 400 when passwords do not match', async () => {
    const response = createResponse();

    await authController.registration(
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

  it('returns 409 when user with email already exists', async () => {
    const response = createResponse();
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'John Doe',
      passwordHash: 'hash',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActivated: true,
    });

    await authController.registration(
      {
        body: {
          name: 'John Doe',
          email: 'test@example.com',
          password: '12345678',
          confirmPassword: '12345678',
        },
      } as never,
      response as never,
    );

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: 'test@example.com',
      },
    });
    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message: 'User with this email already exists',
    });
  });

  it('returns 200 when registration payload is valid', async () => {
    const response = createResponse();
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed-password');
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'John Doe',
      passwordHash: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActivated: true,
    });

    await authController.registration(
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

    expect(bcrypt.hash).toHaveBeenCalledWith('12345678', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'John Doe',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
      },
    });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      message: 'User registered successfully.',
      data: {
        id: '1',
        email: 'test@example.com',
        name: 'John Doe',
        isActivated: true,
      },
    });
  });
});

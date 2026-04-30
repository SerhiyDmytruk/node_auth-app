import { Request, Response } from 'express';

type LoginRequestBody = {
  email?: unknown;
  password?: unknown;
};

const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

function validateEmail(value: unknown): string | null {
  if (typeof value !== 'string') {
    return 'Email must be a string';
  }

  const trimmedEmail = value.trim();

  if (!trimmedEmail) {
    return 'Email is required';
  }

  if (!emailPattern.test(trimmedEmail)) {
    return 'Email is not valid';
  }

  return null;
}

function validatePassword(value: unknown): string | null {
  if (typeof value !== 'string') {
    return 'Password must be a string';
  }

  if (!value.trim()) {
    return 'Password is required';
  }

  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }

  return null;
}

const login = (req: Request, res: Response): void => {
  const { email, password } = (req.body ?? {}) as LoginRequestBody;
  const emailError = validateEmail(email);

  if (emailError) {
    res.status(400).json({ message: emailError });

    return;
  }

  const passwordError = validatePassword(password);

  if (passwordError) {
    res.status(400).json({ message: passwordError });

    return;
  }

  const trimmedEmail = email.trim();

  // start search in the db

  res.status(200).json({
    message: 'Login payload is valid.',
    data: {
      email: trimmedEmail,
    },
  });
};

export const loginController = {
  login,
};

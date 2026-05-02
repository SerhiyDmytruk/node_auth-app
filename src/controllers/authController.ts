import { Request, Response } from 'express';

type AuthRequestBody = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
  confirmPassword?: unknown;
};

const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

function validateEmail(value: string): string | null {
  const trimmedEmail = value.trim();

  if (!trimmedEmail) {
    return 'Email is required';
  }

  if (!emailPattern.test(trimmedEmail)) {
    return 'Email is not valid';
  }

  return null;
}

function validatePassword(value: string): string | null {
  if (!value.trim()) {
    return 'Password is required';
  }

  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }

  return null;
}

function validateName(value: string): string | null {
  if (!value.trim()) {
    return 'Name is required';
  }

  if (value.length < 3) {
    return 'Name must be at least 3 characters';
  }

  return null;
}

const registration = (req: Request, res: Response): void => {
  const { name, email, password, confirmPassword } = (req.body ??
    {}) as AuthRequestBody;

  if (typeof email !== 'string') {
    res.status(400).json({ message: 'Email must be a string' });

    return;
  }

  if (typeof name !== 'string') {
    res.status(400).json({ message: 'Name must be a string' });

    return;
  }

  if (typeof password !== 'string') {
    res.status(400).json({ message: 'Password must be a string' });

    return;
  }

  if (typeof confirmPassword !== 'string') {
    res.status(400).json({ message: 'Confirm password must be a string' });

    return;
  }

  const trimmedEmail = email.trim();
  const emailError = validateEmail(trimmedEmail);

  if (emailError) {
    res.status(400).json({ message: emailError });

    return;
  }

  const passwordError = validatePassword(password);

  if (passwordError) {
    res.status(400).json({ message: passwordError });

    return;
  }

  const confirmPasswordError = validatePassword(confirmPassword);

  if (confirmPasswordError) {
    res.status(400).json({ message: confirmPasswordError });

    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: 'Passwords do not match' });

    return;
  }

  const trimmedName = name.trim();
  const nameError = validateName(trimmedName);

  if (nameError) {
    res.status(400).json({ message: nameError });

    return;
  }

  // start search in the db

  res.status(200).json({
    message: 'Registration data is valid.',
    data: {
      email: trimmedEmail,
      name: trimmedName,
    },
  });
};

export const authController = {
  registration,
};

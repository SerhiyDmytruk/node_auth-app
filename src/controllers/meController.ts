import { Request, Response } from 'express';

const me = (req: Request, res: Response): void => {
  const authorization = req.headers.authorization;
  const refreshToken = req.cookies?.refreshToken;

  if (!authorization && typeof refreshToken !== 'string') {
    res.status(401).json({ message: 'Authentication is required' });

    return;
  }

  // start search in the db

  res.status(200).json({
    message: 'Authentication context is present.',
    data: {
      authenticated: true,
    },
  });
};

export const meController = {
  me,
};

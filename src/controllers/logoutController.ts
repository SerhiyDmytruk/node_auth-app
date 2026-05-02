import { Request, Response } from 'express';

const logout = (req: Request, res: Response): void => {
  const authorization = req.headers.authorization;
  const refreshToken = req.cookies?.refreshToken;

  if (!authorization && typeof refreshToken !== 'string') {
    res.status(401).json({ message: 'Authentication is required' });

    return;
  }

  // start search in the db

  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logout request is valid.' });
};

export const logoutController = {
  logout,
};

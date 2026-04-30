import { Request, Response } from 'express';

const logout = (req: Request, res: Response): void => {
  res.send('Hello!');
};

export const logoutController = {
  logout,
};

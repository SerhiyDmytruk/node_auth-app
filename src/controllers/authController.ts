import { Request, Response } from 'express';

const registration = (req: Request, res: Response): void => {
  res.send('Hello!');
};

export const authController = {
  registration,
};

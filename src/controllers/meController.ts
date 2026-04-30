import { Request, Response } from 'express';

const me = (req: Request, res: Response): void => {
  res.send('Hello!');
};

export const meController = {
  me,
};

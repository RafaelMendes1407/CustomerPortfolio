import { Request, Response } from 'express';

const clients = [{name: 'Rafael', email:'rafael_mendes@outlook.com'}]

export default {
  async index(req: Request, res: Response) {
    return res.json(clients);
  }
}
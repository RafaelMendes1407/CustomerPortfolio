import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'

function authMiddleware (req: Request, res: Response, next: NextFunction): Response | undefined {
  const authHeader = req.headers.authorization
  if (!authHeader) { return res.status(401).send({ error: 'No token provided' }) }

  const parts = authHeader.split(' ')
  if (parts.length !== 2) { return res.status(401).send({ error: 'Token Error' }) }

  const [bearer, token] = parts

  if (!/^Bearer$/i.test(bearer)) { return res.status(401).send({ error: 'Token Error' }) }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) { return res.status(401).send({ error: 'Token Invalid' }) }
    req.userId = decoded.id
    return next()
  })
}

export default authMiddleware

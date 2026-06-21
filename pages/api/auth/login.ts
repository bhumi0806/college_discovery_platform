import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body as { email: string; password: string }
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d'
  })

  return res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } })
}

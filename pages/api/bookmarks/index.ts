import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me'

function getUserId(req: NextApiRequest) {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) return null
  const token = auth.slice(7)

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string }
    return payload.userId
  } catch {
    return null
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = getUserId(req)
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: { college: true }
    })
    return res.status(200).json(bookmarks)
  }

  if (req.method === 'POST') {
    const { collegeId } = req.body as { collegeId: string }
    if (!collegeId) {
      return res.status(400).json({ error: 'collegeId is required' })
    }
    const bookmark = await prisma.bookmark.create({
      data: { userId, collegeId }
    })
    return res.status(201).json(bookmark)
  }

  if (req.method === 'DELETE') {
    const { collegeId } = req.body as { collegeId: string }
    if (!collegeId) {
      return res.status(400).json({ error: 'collegeId is required' })
    }
    await prisma.bookmark.delete({ where: { userId_collegeId: { userId, collegeId } } })
    return res.status(204).end()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

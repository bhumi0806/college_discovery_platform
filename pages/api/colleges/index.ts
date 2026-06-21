import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const q = (req.query.q as string) ?? ''
    const colleges = await prisma.college.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { location: { contains: q, mode: 'insensitive' } }
        ]
      },
      orderBy: { rating: 'desc' },
      take: 50,
      select: {
        id: true,
        name: true,
        location: true,
        fees: true,
        rating: true,
        placements: true
      }
    })
    return res.status(200).json(colleges)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const college = await prisma.college.findUnique({
    where: { id },
    include: { reviews: true }
  })

  if (!college) {
    return res.status(404).json({ error: 'College not found' })
  }

  return res.status(200).json(college)
}

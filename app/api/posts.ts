import { db } from '@/db';
import { postsTable } from '@/db/schema';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content, userId } = req.body;
    try {
      const newPost = await db.insert(postsTable).values({ title, content, userId }).returning();
      res.status(200).json(newPost);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const posts = await db.select().from(postsTable);
      res.status(200).json(posts);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

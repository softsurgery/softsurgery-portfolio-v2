import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, age, email } = req.body;
    try {
      const newUser = await db.insert(usersTable).values({ name, age, email }).returning();
      res.status(200).json(newUser);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const users = await db.select().from(usersTable);
      res.status(200).json(users);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

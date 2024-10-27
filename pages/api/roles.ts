import { db } from '@/db';
import { rolesTable } from '@/db/schema';
import { NextApiRequest, NextApiResponse } from 'next';

// Handle HTTP requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Create a new role
    const { roleName } = req.body;

    if (!roleName) {
      return res.status(400).json({ error: 'Role name is required' });
    }

    try {
      const newRole = await db.insert(rolesTable).values({ roleName }).returning();
      return res.status(201).json(newRole);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create role' });
    }
  } else if (req.method === 'GET') {
    // Get all roles
    try {
      const roles = await db.select().from(rolesTable);
      return res.status(200).json(roles);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch roles' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

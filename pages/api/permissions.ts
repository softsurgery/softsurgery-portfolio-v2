import { db } from '@/db';
import { permissionsTable } from '@/db/schema';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Create a new permission
    const { permissionName } = req.body;

    if (!permissionName) {
      return res.status(400).json({ error: 'Permission name is required' });
    }

    try {
      const newPermission = await db.insert(permissionsTable).values({ permissionName }).returning();
      return res.status(201).json(newPermission);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create permission' });
    }
  } else if (req.method === 'GET') {
    // Get all permissions
    try {
      const permissions = await db.select().from(permissionsTable);
      return res.status(200).json(permissions);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch permissions' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

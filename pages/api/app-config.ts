// /pages/api/app-config.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { appConfigTable } from '../../db/schema'; // Table schema
import { eq } from 'drizzle-orm'; // Import eq for filtering
import { db } from '@/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    // GET request: Fetch all app config records
    case 'GET':
      try {
        const config = await db.select().from(appConfigTable); // Fetch all records
        res.status(200).json(config);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch app configurations' });
      }
      break;

    // POST request: Create a new app config entry
    case 'POST':
      try {
        const { title, config } = req.body;

        if (!title || !config) {
          return res.status(400).json({ error: 'Title and config are required' });
        }

        // Insert new record
        const newConfig = await db.insert(appConfigTable).values({
          title,
          config: JSON.parse(config) // Parse JSON config
        }).returning();

        res.status(201).json(newConfig); // Return the inserted record
      } catch (error) {
        res.status(500).json({ error: 'Failed to create app configuration' });
      }
      break;

    // PUT request: Update an app config entry by id
    case 'PUT':
      try {
        const { id, title, config } = req.body;

        if (!id || !title || !config) {
          return res.status(400).json({ error: 'ID, title, and config are required' });
        }

        // Update record by id
        const updatedConfig = await db.update(appConfigTable)
          .set({
            title,
            config: JSON.parse(config),
          })
          .where(eq(appConfigTable.id, id)) // Use eq() for filtering by id
          .returning();

        res.status(200).json(updatedConfig); // Return updated record
      } catch (error) {
        res.status(500).json({ error: 'Failed to update app configuration' });
      }
      break;

    // DELETE request: Delete an app config entry by id
    case 'DELETE':
      try {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ error: 'ID is required' });
        }

        // Delete record by id
        await db.delete(appConfigTable).where(eq(appConfigTable.id, id));
        res.status(204).end(); // No content after delete
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete app configuration' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

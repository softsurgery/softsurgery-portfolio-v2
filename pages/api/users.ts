import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { db } from '@/db';
import { usersTable } from '@/db/schema';

// Handle HTTP requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Create a new user
    const { name, age, email, password, roleId } = req.body;

    if (!name || !age || !email || !password || !roleId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert user into the database
      const newUser = await db.insert(usersTable).values({
        name,
        age,
        email,
        password: hashedPassword,
        roleId,
      }).returning();

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  } else if (req.method === 'GET') {
    // Get all users
    try {
      const users = await db.select().from(usersTable);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

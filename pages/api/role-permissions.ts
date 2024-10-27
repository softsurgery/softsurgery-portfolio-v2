import { db } from "@/db";
import {
  permissionsTable,
  rolePermissionsTable,
  rolesTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

// Handle HTTP requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Assign a permission to a role
    const { roleId, permissionId } = req.body;

    if (!roleId || !permissionId) {
      return res
        .status(400)
        .json({ error: "Role ID and Permission ID are required" });
    }

    try {
      const newAssignment = await db
        .insert(rolePermissionsTable)
        .values({ roleId, permissionId })
        .returning();
      return res.status(201).json(newAssignment);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to assign permission to role" });
    }
  } else if (req.method === "GET") {
    // Get all role-permission assignments
    try {
      const rolePermissions = await db
        .select({
          roleId: rolesTable.id,
          roleName: rolesTable.roleName,
          permissionName: permissionsTable.permissionName,
        })
        .from(rolePermissionsTable)
        .innerJoin(rolesTable, eq(rolePermissionsTable.roleId, rolesTable.id))
        .innerJoin(
          permissionsTable,
          eq(rolePermissionsTable.permissionId, permissionsTable.id)
        );

      return res.status(200).json(rolePermissions);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch role-permission assignments" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

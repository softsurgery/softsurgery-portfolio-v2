"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissionsFocal } from "@/components/user-manager/permissions/PermissionsFocal";
import { CircleCheckBig, Shield, Users } from "lucide-react";

export default function Page() {
  return (
    <Tabs defaultValue="users">
      <TabsList className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 w-full h-fit">
        <TabsTrigger value="users" className="flex gap-1">
          <Users />
          Users
        </TabsTrigger>
        <TabsTrigger value="roles" className="flex gap-1">
          <Shield />
          Roles
        </TabsTrigger>
        <TabsTrigger value="permissions" className="flex gap-1">
          <CircleCheckBig />
          Permissions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="users">Users</TabsContent>
      <TabsContent value="roles">Roles</TabsContent>
      <TabsContent value="permissions">
        <PermissionsFocal className="my-8 mx-4"/>
      </TabsContent>
    </Tabs>
  );
}

"use client";

import Layout from "@/components/layout/admin/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <Tabs defaultValue="general">
      <TabsList className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 w-full h-fit">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="projects">Projects & Skills</TabsTrigger>
        <TabsTrigger value="experience">Education & Experience</TabsTrigger>
      </TabsList>
      <TabsContent value="general">General</TabsContent>
      <TabsContent value="projects">Projects & Skills</TabsContent>
      <TabsContent value="experience">Education & Experience</TabsContent>
    </Tabs>
  );
}

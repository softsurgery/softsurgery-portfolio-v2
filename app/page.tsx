import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1>Hello, This is Soft Surgery Protfolio</h1>
      {/* <Header portfolioOwner="Soft"/> */}
    </main>
  );
}

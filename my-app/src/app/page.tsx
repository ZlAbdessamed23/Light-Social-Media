import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-900">
      <Button variant="shadow" color="primary" size="lg"><Link href="/login">Get Started</Link></Button>
    </div>
  );
}

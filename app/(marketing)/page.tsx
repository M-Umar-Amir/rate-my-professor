import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChatModal } from "./_components/chatModal";

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-400">Rate and Find Your Professor</h1>
          <p className="text-xl">
            Rate your professors, find the best ones, and share your thoughts.
          </p>
          <div className="flex items-center gap-4">
            <Input placeholder="Search by Name of Professor" />
            <Button>Search</Button>
          </div>
          <div>
            <ChatModal />
          </div>
        </div>

        <div>

        </div>
      </div>
    </main>
  );
}

"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatModal } from "./_components/chatModal";
import { Reviews } from "../_constants";
import { ProfessorCard } from "./_components/profCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedReviews, setDisplayedReviews] = useState(Reviews.slice(0, 6));

  const handleSearch = () => {
    const filteredReviews = Reviews.filter((review : any) =>
      review.professor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedReviews(filteredReviews.slice(0, 6));
  };

  const handleInputSearch = (e : any) => {
    setSearchTerm(e.target.value)
    handleSearch()
  }
  return (
    <main className="min-h-screen p-24">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="md:text-5xl text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-400">
            Rate and Find Your Professor
          </h1>
          <p className="text-xl">
            Rate your professors, find the best ones, and share your thoughts.
          </p>
          <div className="flex items-center gap-4 w-full">
            <Input
              placeholder="Search by Name of Professor"
              className="w-full"
              value={searchTerm}
              onChange={handleInputSearch}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
          <div>
            <ChatModal />
          </div>
        </div>

        <div className=" mt-16 grid lg:grid-cols-3 gap-10 grid-cols-1 md:grid-cols-2">
          {displayedReviews.map((review, id) => (
            <ProfessorCard key={id} cardreviews={review} />
          ))}
        </div>
      </div>
    </main>
  );
}

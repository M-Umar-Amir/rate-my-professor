import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "@radix-ui/react-icons";

interface ProfessorCardProps {
  professor: string;
  subject: string;
  stars: number;
  review: string;
}

interface ProfProps {
    cardreviews: ProfessorCardProps;
}

export function ProfessorCard({cardreviews} : ProfProps){
  return (
    <Card className="w-64 bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out 
                     transform hover:-translate-y-1 hover:bg-gray-50">
      <CardHeader className="flex items-center justify-center pb-2">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/" alt={cardreviews.professor} />
          <AvatarFallback>{cardreviews.professor[0]}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="font-semibold text-lg mb-1">{cardreviews.professor}</h3>
        <p className="text-sm text-gray-600 mb-3">{cardreviews.subject}</p>
        <div className="flex items-center justify-center mb-2">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`w-4 h-4 ${
                index < cardreviews.stars ? "text-yellow-400" : "text-gray-300"
              } transition-colors duration-200`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500">{cardreviews.review} reviews</p>
      </CardContent>
    </Card>
  );
};
import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EventDetails({ event }) {
  const { user } = event;
  return (
    <div className="p-10 lg:w-1/3 bg-gray-950 backdrop-blur-md border border-gray-600 rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold mb-4 text-white">{event.title}</h1>
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4 border border-[#EACBED]">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback className="bg-gray-800 text-[#EACBED]">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-white">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <Clock className="mr-2 text-[#EACBED]" />
        <span className="text-white">{event.duration} minutes</span>
      </div>
      <div className="flex items-center mb-4">
        <Calendar className="mr-2 text-[#FFD770]" />
        <span className="text-white">Google Meet</span>
      </div>
      <p className="text-gray-400">{event.description}</p>
    </div>
  );
}

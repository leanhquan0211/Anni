import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star, Edit, Trash2 } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  rating: number;
}

interface MeetingCardProps {
  meeting: Meeting;
  onEdit: (meeting: Meeting) => void;
  onDelete: (id: string) => void;
}

const MeetingCard = ({ meeting, onEdit, onDelete }: MeetingCardProps) => {
  return (
    <Card className="border border-primary/10 hover:border-primary/30 transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{meeting.title}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(meeting.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent" fill="currentColor" />
              ))}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(meeting)}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(meeting.id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-foreground/60">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{meeting.date}</span>
          </div>
          {meeting.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{meeting.location}</span>
            </div>
          )}
        </div>
      </CardHeader>
      {meeting.description && (
        <CardContent>
          <p className="text-foreground/70">{meeting.description}</p>
        </CardContent>
      )}
    </Card>
  );
};

export default MeetingCard;
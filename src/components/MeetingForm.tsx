import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Meeting {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  rating: number;
}

interface MeetingFormProps {
  meeting?: Meeting;
  onSubmit: (meeting: Omit<Meeting, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const MeetingForm = ({ meeting, onSubmit, onCancel, isEditing = false }: MeetingFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    rating: 5
  });

  useEffect(() => {
    if (meeting) {
      setFormData({
        title: meeting.title,
        date: meeting.date,
        location: meeting.location,
        description: meeting.description,
        rating: meeting.rating
      });
    }
  }, [meeting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    onSubmit(formData);
    if (!isEditing) {
      setFormData({ title: "", date: "", location: "", description: "", rating: 5 });
    }
  };

  return (
    <Card className="border border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg">
          {isEditing ? "Sửa buổi gặp" : "Thêm buổi gặp mới"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Buổi hẹn đầu tiên..."
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="date">Ngày</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="border-primary/20 focus:border-primary"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Địa điểm</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Cafe, công viên..."
              className="border-primary/20 focus:border-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Chia sẻ cảm xúc của bạn..."
              className="border-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <Label htmlFor="rating">Điểm hạnh phúc (1-5)</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
              className="border-primary/20 focus:border-primary"
            />
          </div>

          <div className="flex space-x-2">
            <Button type="submit" className="love-gradient text-white">
              {isEditing ? "Cập nhật" : "Lưu buổi gặp"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MeetingForm;
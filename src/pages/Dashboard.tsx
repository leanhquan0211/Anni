import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Users, Calendar, Star, Plus, Edit, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MeetingCard from "@/components/MeetingCard";
import MeetingForm from "@/components/MeetingForm";
import PersonalInfoForm from "@/components/PersonalInfoForm";

interface Meeting {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  rating: number;
}

interface PersonalInfo {
  person1: {
    name: string;
    birthday: string;
    hobby: string;
  };
  person2: {
    name: string;
    birthday: string;
    hobby: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [loveStartDate, setLoveStartDate] = useState("2024-01-14");
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "Buổi hẹn đầu tiên",
      date: "2024-01-14",
      location: "Cafe Highlands",
      description: "Ngày đẹp nhất trong đời. Em rất xinh và dễ thương 💕",
      rating: 5
    },
    {
      id: "2", 
      title: "Xem phim cùng nhau",
      date: "2024-02-14",
      location: "CGV Vincom",
      description: "Xem phim tình cảm, em khóc và anh ôm em hihi",
      rating: 5
    }
  ]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    person1: {
      name: "Anh",
      birthday: "1995-01-01",
      hobby: "Chơi game, xem phim"
    },
    person2: {
      name: "Em",
      birthday: "1996-02-14",
      hobby: "Đọc sách, nghe nhạc"
    }
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  const handleLogout = () => {
    toast.success("Tạm biệt! Hẹn gặp lại 💕");
    navigate("/");
  };

  const calculateLoveDays = () => {
    const startDate = new Date(loveStartDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddMeeting = (meetingData: Omit<Meeting, 'id'>) => {
    const meeting: Meeting = {
      id: Date.now().toString(),
      ...meetingData
    };

    setMeetings(prev => [meeting, ...prev]);
    setShowAddForm(false);
    toast.success("Đã thêm buổi gặp mới! 💕");
  };

  const handleEditMeeting = (meetingData: Omit<Meeting, 'id'>) => {
    if (!editingMeeting) return;
    
    setMeetings(prev => prev.map(meeting => 
      meeting.id === editingMeeting.id 
        ? { ...meetingData, id: editingMeeting.id }
        : meeting
    ));
    setEditingMeeting(null);
    toast.success("Đã cập nhật buổi gặp! 💕");
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id));
    toast.success("Đã xóa buổi gặp! 💔");
  };

  const handleUpdatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info);
    toast.success("Đã cập nhật thông tin cá nhân! 💕");
  };

  return (
    <div className="min-h-screen romantic-gradient p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-primary animate-heartbeat" fill="currentColor" />
            <h1 className="text-3xl font-bold love-gradient bg-clip-text text-transparent">
              Love Dashboard
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <Heart className="w-8 h-8 text-primary mx-auto animate-pulse" fill="currentColor" />
              <CardTitle className="text-2xl font-bold text-primary">{calculateLoveDays()}</CardTitle>
              <CardDescription>Ngày yêu nhau</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="love-start-date" className="text-sm">Ngày bắt đầu</Label>
                <Input
                  id="love-start-date"
                  type="date"
                  value={loveStartDate}
                  onChange={(e) => setLoveStartDate(e.target.value)}
                  className="border-primary/20 focus:border-primary text-center"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto" />
              <CardTitle className="text-2xl font-bold text-primary">{meetings.length}</CardTitle>
              <CardDescription>Số buổi gặp</CardDescription>
            </CardHeader>
          </Card>

          <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <Star className="w-8 h-8 text-accent mx-auto" fill="currentColor" />
              <CardTitle className="text-2xl font-bold text-accent">
                {meetings.length > 0 ? (meetings.reduce((sum, m) => sum + m.rating, 0) / meetings.length).toFixed(1) : 0}/5
              </CardTitle>
              <CardDescription>Điểm hạnh phúc TB</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Personal Info Section */}
        <div className="mb-8">
          <PersonalInfoForm 
            personalInfo={personalInfo}
            onUpdate={handleUpdatePersonalInfo}
          />
        </div>

        {/* Meetings Section */}
        <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Các buổi gặp của chúng ta</span>
                </CardTitle>
                <CardDescription>Lưu giữ những khoảnh khắc đẹp nhất</CardDescription>
              </div>
              <Button
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  setEditingMeeting(null);
                }}
                className="love-gradient text-white hover:scale-[1.02] transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm buổi gặp
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Add/Edit Meeting Form */}
            {(showAddForm || editingMeeting) && (
              <MeetingForm
                meeting={editingMeeting || undefined}
                onSubmit={editingMeeting ? handleEditMeeting : handleAddMeeting}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingMeeting(null);
                }}
                isEditing={!!editingMeeting}
              />
            )}

            {/* Meetings List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onEdit={(meeting) => {
                    setEditingMeeting(meeting);
                    setShowAddForm(false);
                  }}
                  onDelete={handleDeleteMeeting}
                />
              ))}
            </div>

            {meetings.length === 0 && (
              <div className="text-center py-12 text-foreground/50">
                <Heart className="w-12 h-12 mx-auto mb-4 text-primary/30" />
                <p>Chưa có buổi gặp nào. Hãy thêm buổi gặp đầu tiên!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, Camera, Calendar, MapPin, Star, Plus, Edit, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Memory {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  rating: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [meetCount, setMeetCount] = useState(12);
  const [newMemory, setNewMemory] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    rating: 5
  });
  const [memories, setMemories] = useState<Memory[]>([
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
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLogout = () => {
    toast.success("Tạm biệt! Hẹn gặp lại 💕");
    navigate("/");
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemory.title || !newMemory.date) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const memory: Memory = {
      id: Date.now().toString(),
      ...newMemory
    };

    setMemories(prev => [memory, ...prev]);
    setNewMemory({ title: "", date: "", location: "", description: "", rating: 5 });
    setShowAddForm(false);
    toast.success("Đã thêm kỷ niệm mới! 💕");
  };

  const incrementMeetCount = () => {
    setMeetCount(prev => prev + 1);
    toast.success("Tăng số lần gặp! 🥰");
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
              <Calendar className="w-8 h-8 text-primary mx-auto" />
              <CardTitle className="text-2xl font-bold text-primary">{meetCount}</CardTitle>
              <CardDescription>Số lần gặp nhau</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={incrementMeetCount}
                className="w-full love-gradient text-white hover:scale-[1.02] transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tăng lên
              </Button>
            </CardContent>
          </Card>

          <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <Heart className="w-8 h-8 text-primary mx-auto animate-pulse" fill="currentColor" />
              <CardTitle className="text-2xl font-bold text-primary">{memories.length}</CardTitle>
              <CardDescription>Kỷ niệm đẹp</CardDescription>
            </CardHeader>
          </Card>

          <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <Star className="w-8 h-8 text-accent mx-auto" fill="currentColor" />
              <CardTitle className="text-2xl font-bold text-accent">
                {memories.reduce((sum, m) => sum + m.rating, 0) / memories.length || 0}/5
              </CardTitle>
              <CardDescription>Điểm hạnh phúc TB</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Memories Section */}
        <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-primary" />
                  <span>Kỷ niệm của chúng ta</span>
                </CardTitle>
                <CardDescription>Lưu giữ những khoảnh khắc đẹp nhất</CardDescription>
              </div>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="love-gradient text-white hover:scale-[1.02] transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm kỷ niệm
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Add Memory Form */}
            {showAddForm && (
              <Card className="border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Thêm kỷ niệm mới</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddMemory} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Tiêu đề</Label>
                        <Input
                          id="title"
                          value={newMemory.title}
                          onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                          placeholder="Buổi hẹn đầu tiên..."
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Ngày</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newMemory.date}
                          onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
                          className="border-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Địa điểm</Label>
                      <Input
                        id="location"
                        value={newMemory.location}
                        onChange={(e) => setNewMemory({...newMemory, location: e.target.value})}
                        placeholder="Cafe, công viên..."
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Mô tả</Label>
                      <Textarea
                        id="description"
                        value={newMemory.description}
                        onChange={(e) => setNewMemory({...newMemory, description: e.target.value})}
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
                        value={newMemory.rating}
                        onChange={(e) => setNewMemory({...newMemory, rating: parseInt(e.target.value)})}
                        className="border-primary/20 focus:border-primary"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button type="submit" className="love-gradient text-white">
                        Lưu kỷ niệm
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                        Hủy
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Memories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memories.map((memory) => (
                <Card key={memory.id} className="border border-primary/10 hover:border-primary/30 transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{memory.title}</CardTitle>
                      <div className="flex">
                        {[...Array(memory.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-accent" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-foreground/60">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{memory.date}</span>
                      </div>
                      {memory.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{memory.location}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  {memory.description && (
                    <CardContent>
                      <p className="text-foreground/70">{memory.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {memories.length === 0 && (
              <div className="text-center py-12 text-foreground/50">
                <Heart className="w-12 h-12 mx-auto mb-4 text-primary/30" />
                <p>Chưa có kỷ niệm nào. Hãy thêm kỷ niệm đầu tiên!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
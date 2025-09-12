import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Users, Calendar, Star, Plus, LogOut, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MeetingCard from "@/components/MeetingCard";
import MeetingForm from "@/components/MeetingForm";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Giả định shadcn-ui có Accordion

interface Meeting {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  rating: number;
  hugs: number;        // Số lần ôm
  kisses: number;      // Số lần hôn
  handHolds: number;   // Số lần nắm tay
  durationHours: number;    // Thời gian giờ
  durationMinutes: number;  // Thời gian phút
  durationSeconds: number;
}

interface PersonalInfo {
  person1: {
    name: string;
    birthday: string;
    hobby: string;
    nickname: string;
  };
  person2: {
    name: string;
    birthday: string;
    hobby: string;
    nickname: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();

  // 🔹 Lưu ngày bắt đầu yêu
  const [loveStartDate, setLoveStartDate] = useLocalStorage("loveStartDate", "2022-09-17");

  // 🔹 Lưu danh sách buổi gặp
  const [meetings, setMeetings] = useLocalStorage<Meeting[]>("meetings", [
    {
      id: "1",
      title: "Đưa hàng Shopee",
      date: "2024-09-06",
      location: "Giữa toà B5 và B3 KTX khu B",
      description: "Mới từ quê lên nên qua lấy hàng shopee bữa nhờ Nguyên lấy hộ",
      rating: 3,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,
      durationMinutes: 2,
      durationSeconds: 0,
    },
    {
      id: "2",
      title: "Hẹn gặp vì lâu không gặp",
      date: "2024-09-09",
      location: "KTX khu B và quán bánh canh",
      description: "Đi ăn bánh canh xong về sau toà B3 ngồi nói chuyện bla bla, AnhQuan bắt đầu chuỗi ngày buồn hiu hiu",
      rating: 2,
      hugs: 0,
      kisses: 0,
      handHolds: 1,
      durationHours: 1,     // Ví dụ: 2 giờ
      durationMinutes: 30,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    // 28 buổi gặp mới với dữ liệu rõ ràng
    {
      id: "3",
      title: "Kỷ niệm 2 năm yêu nhau, trùng ngày Trung Thu luôn",
      date: "2024-09-17",
      location: "Nhà Văn Hoá Sinh Viên",
      description: "Đi mua đồ ăn rồi qua nhà văn hoá ngồi ăn, nói chiện, đưa quà, rồi đi về, khong có ôm hôn gì luon",
      rating: 1,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 2,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "4",
      title: "Đi ăn, ngồi nói chuyện",
      date: "2024-09-18",
      location: "Quán bánh canh cua Hoàng Diệu 2, KTX khu B",
      description: "Đi ăn xong về ngồi ở hồ bán nguyệt, Nguyên đưa quà cho AnhQuan, ròi đưa bóp của Nguyên bắt AnhQuan về giặt nựa(Anhquan dang thuong), ngồi nói chiện xíu thì mưa nên chạy dìa",
      rating: 4,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 2,     // Ví dụ: 2 giờ
      durationMinutes: 30,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "5",
      title: "Đưa trà sữa, trả bóp cho Nguyên, lấy quà",
      date: "2024-09-21",
      location: "Sau toà B3 KTX khu B",
      description: "AnhQuan giabo mua trà sữa để gặp Nguyên rồi trả bóp đã giặt xong và lấy quà(khung ảnh)",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 2,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "6",
      title: "Đi ăn",
      date: "2024-09-26",
      location: "Quán bún đỏ Hoàng Diệu 2",
      description: "Ăn xong đi về mua trà sữa tuk tuk rồi về",
      rating: 3,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 45,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "7",
      title: "Tặng hoa cho Nguyên",
      date: "2024-10-02",
      location: "Bên hông toà B3 trước nhà xe",
      description: "Hôm đó thấy hoa đẹp mà rẻ do người ta mới mở tiệm á, nên mua lun cho người đẹp, hê hê",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 20,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "8",
      title: "Đi BHX mua đồ",
      date: "2024-10-09",
      location: "BHX đường số 8",
      description: "Hôm Nguyên rủ đi mua đồ thế là đi mua đồ",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 30,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "9",
      title: "Đi ăn tối, đưa quà 20/10",
      date: "2024-19-10",
      location: "Không nhớ ăn ở mô",
      description: "Đưa quà 20/10 trước tại 20/10 Anhquan về quê, biets gi khong, hom do đi lấy hoa mà mưa quá trời luon, uot mlem melm",
      rating: 5,
      hugs: 1,
      kisses: 1,
      handHolds: 0,
      durationHours: 1,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "10",
      title: "Đưa một bông hoa nhỏ nhân dịp Nguyên được SV5T",
      date: "2024-10-28",
      location: "Sau toà Nguyên",
      description: "Tặng 1 bông hoa với lại mua cho nhỏ ly matcha sữa gạo rang cho nó tỉnh ngủ mà nhỏ bảo hong thích matcha",
      rating: 5,
      hugs: 1,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 5,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "11",
      title: "Dụ Nguyên đi sinh nhật AnhQuan",
      date: "2024-11-01",
      location: "Nhà văn hoá sinh viên, Yes coffee",
      description: "Đi xem phim tội nghiệp Vinh, xong rồi về cafe ngụ, được ôm, hôn Nguyên, thích quá chời, mà Nguyên khong ôm mình",
      rating: 5,
      hugs: 1,
      kisses: 1,
      handHolds: 1,
      durationHours: 8,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "12",
      title: "Đi BHX ",
      date: "2024-11-07",
      location: "BHX đường số 8",
      description: "Nguyên rủ đi mua đồ",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 1,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "13",
      title: "Đi ăn bánh canh",
      date: "2024-11-27",
      location: "Hoàng Diệu 2 - chắc là thế",
      description: "Đi ăn mô hong nhớ nữa mà ăn bánh canh thì khả năng cao là Hoàng Diệu 2",
      rating: 5,
      hugs: 1,
      kisses: 0,
      handHolds: 1,
      durationHours: 1,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "14",
      title: "Đi mua đồ ăn, Nguyên đưa quà sinh nhật",
      date: "2024-12-25",
      location: "KTX khu B",
      description: "Đi mua lạp xưởng nướng đá thì phải, xong lấy quà Nguyên đưa, quá bùn vì không được đi chơi noel, AnhQuan khong mang theo quà xuống",
      rating: 2,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 1,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "15",
      title: "Đưa Nguyên đi nhổ răng khôn",
      date: "2024-12-30",
      location: "Bệnh viện bên quận 5",
      description: "Dược đi chung với Nguyên, lúc ngồi chờ khám đòi ôm Nguyên xíu mà Nguyên khong cho, buồn hiuuuuuuuuuuu",
      rating: 4,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 4,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "16",
      title: "Đi ăn, đi dạo, ngồi chơi, có Tài Linh",
      date: "2025-01-19",
      location: "Hồ đá Khu Quân sự",
      description: "Đi lung tung, ra hồ đá ngồi chơi rồi về",
      rating: 4,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 3,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "17",
      title: "Đi thăm thầy cô dịp Tết",
      date: "2025-02-01",
      location: "Đồng Xoài",
      description: "Đi thăm thầy cô, chở Nguyên mà Nguyên khong ôm mình, nhớ Tết của 1 năm trước vui hơn nhiều",
      rating: 4,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 9,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "18",
      title: "Qua nhà Linh chơi bài",
      date: "2025-02-02",
      location: "Nhà Linh",
      description: "AnhQuan ngu quen, qua la buon luon, huhu, ngu mat tieu lam gap Nguyen duoc co 30p",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 30,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "19",
      title: "Đưa hàng shopee",
      date: "2025-02-12",
      location: "KTX khu B",
      description: "khong nhớ hàng gì nựa",
      rating: 4,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 2,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "20",
      title: "Valentine",
      date: "2025-02-14",
      location: "Nhà Văn Hoá Sinh Viên",
      description: "Đi ăn, xem phim, chụp photobooth",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 3,     // Ví dụ: 2 giờ
      durationMinutes: 45,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "21",
      title: "Đi ăn bánh canh, đi go",
      date: "2025-03-03",
      location: "Go Dĩ An, Hoàng Diệu 2",
      description: "Khong nhớ chi hết trơn",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 2,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "22",
      title: "8-3",
      date: "2025-08-03",
      location: "Buffet bên Tô Vĩnh Diện",
      description: "Đi ăn buffet có Tài Linh",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 4,     // Ví dụ: 2 giờ
      durationMinutes: 30,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "23",
      title: "Đi ăn Sinh Nhật Linh",
      date: "2025-03-27",
      location: "Ăn gà ở Jollibee, xong đi qua KiCa rồi đi qua quán Cafe",
      description: "Mẽo mèo meo luôn",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 3,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "24",
      title: "Đưa đồ đá banh",
      date: "2025-04-03",
      location: "Trước toà B5 KTX khu B",
      description: "Bữa đặt áo với mấy thằng xong đặt cho Nguyên luôn",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 3,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "25",
      title: "Chở Nguyên đi khám răng",
      date: "2025-04-13",
      location: "Nha khoa gì đó bên quận 9",
      description: "Đi khám để chuẩn bị niềng thì phải",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 2,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "26",
      title: "Đưa quà sinh Nhật",
      date: "2025-04-14",
      location: "Sau toà B3 KTX khu B",
      description: "Mang quà sinh nhật qua trước",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 5,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "27",
      title: "Sinh nhật Nguyên",
      date: "2025-04-15",
      location: "Nhà hàng BAO",
      description: "Đi ăn nhà hàng đồ đó",
      rating: 5,
      hugs: 1,
      kisses: 0,
      handHolds: 0,
      durationHours: 3,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "28",
      title: "Lấy lại đồ giặt ủi",
      date: "2025-05-04",
      location: "Trước toà B5 KTX khu B",
      description: "Thấy Nguyên không ở phòng nên nhờ lấy hộ đồ giặt ủi",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 1,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "29",
      title: "1000 ngày yêu nhau",
      date: "2025-06-13",
      location: "Quán panacotta gần Hoàng Diệu 2",
      description: "Mắc cười lắm, 1000 ngày trùng với ngày sinh nhật của KN luôn, tính nói mà sợ bị chựi",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 2,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "30",
      title: "Đi Vũng Tàu",
      date: "2025-06-27",
      location: "Vũng Tàu",
      description: "Đi nghỉ dưỡng đồ đó",
      rating: 5,
      hugs: 2,
      kisses: 3,
      handHolds: 2,
      durationHours: 55,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "31",
      title: "Đi lên lại Sài Gòn",
      date: "2025-07-06",
      location: "Đồng Xoài - Sài Gòn",
      description: "Chạm đúng 2s",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 2,
    },
    {
      id: "32",
      title: "Đi ăn đồ Thái, uống trà sữa tuk tuk",
      date: "2025-08-10",
      location: "Đường số mấy đó gần ĐH Ngân Hàng, quán tuk tuk",
      description: "Đi ăn với Tài Linh, Nguyên vừa uốn trà sữa vừa chạy dealine",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 3,     // Ví dụ: 2 giờ
      durationMinutes: 0,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
    {
      id: "33",
      title: "Lấy lại VitVangDangYeu",
      date: "2025-09-04",
      location: "Sau toà B3 KTX khu B",
      description: "Qua lấy lại VitVang tại bữa về quê nhờ Nguyên giữ hộ",
      rating: 5,
      hugs: 0,
      kisses: 0,
      handHolds: 0,
      durationHours: 0,     // Ví dụ: 2 giờ
      durationMinutes: 3,  // Ví dụ: 30 phút
      durationSeconds: 0,
    },
  ]);

  // Thêm state cho thông tin cá nhân
  const [personalInfo, setPersonalInfo] = useLocalStorage<PersonalInfo>("personalInfo", {
    person1: {
      name: "Anh Quân",
      birthday: "2005-11-02",
      hobby: "Nguyen",
      nickname: "Cunscondangthuong",
    },
    person2: {
      name: "Thảo Nguyên",
      birthday: "2005-04-15",
      hobby: "Mèo",
      nickname: "Meowcondangso",
    },
  });

  // Các state tạm (không cần lưu localStorage)
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
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAddMeeting = (meetingData: Omit<Meeting, "id">) => {
    const meeting: Meeting = {
      id: Date.now().toString(),
      ...meetingData,
    };
    setMeetings((prev) => [meeting, ...prev]);
    setShowAddForm(false);
    toast.success("Đã thêm buổi gặp mới! 💕");
  };

  const handleEditMeeting = (meetingData: Omit<Meeting, "id">) => {
    if (!editingMeeting) return;
    setMeetings((prev) =>
      prev.map((meeting) =>
        meeting.id === editingMeeting.id ? { ...meetingData, id: editingMeeting.id } : meeting
      )
    );
    setEditingMeeting(null);
    toast.success("Đã cập nhật buổi gặp! 💕");
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings((prev) => prev.filter((meeting) => meeting.id !== id));
    toast.success("Đã xóa buổi gặp! 💔");
  };

  const handleUpdatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info);
    toast.success("Đã cập nhật thông tin cá nhân! 💕");
  };
  const calculateTotalDurationSeconds = () => {
  return meetings.reduce((total, m) => {
    const hoursToSeconds = m.durationHours * 3600;
    const minutesToSeconds = m.durationMinutes * 60;
    return total + hoursToSeconds + minutesToSeconds + m.durationSeconds;
  }, 0);
};
  const [showMeetings, setShowMeetings] = useState(true); // Mặc định hiện danh sách

  const totalSeconds = calculateTotalDurationSeconds();
  const totalHours = Math.floor(totalSeconds  / 3600);
  const totalMinutes = Math.floor(totalSeconds   / 60);
  const totalGiay = totalSeconds ;  // Tổng giây

  // Hàm reset dữ liệu về mặc định
  const handleRefresh = () => {
    // Xoá các key trong localStorage
    localStorage.removeItem("loveStartDate");
    localStorage.removeItem("meetings");
    localStorage.removeItem("personalInfo");
    // Đặt lại state về mặc định
    setLoveStartDate("2022-09-17");
    setMeetings([
      {
        id: "1",
        title: "Đưa hàng Shopee",
        date: "2024-09-06",
        location: "Giữa toà B5 và B3 KTX khu B",
        description: "Mới từ quê lên nên qua lấy hàng shopee bữa nhờ Nguyên lấy hộ",
        rating: 3,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,
        durationMinutes: 2,
        durationSeconds: 0,
      },
      {
        id: "2",
        title: "Hẹn gặp vì lâu không gặp",
        date: "2024-09-09",
        location: "KTX khu B và quán bánh canh",
        description: "Đi ăn bánh canh xong về sau toà B3 ngồi nói chuyện bla bla, AnhQuan bắt đầu chuỗi ngày buồn hiu hiu",
        rating: 2,
        hugs: 0,
        kisses: 0,
        handHolds: 1,
        durationHours: 1,     // Ví dụ: 2 giờ
        durationMinutes: 30,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      // 28 buổi gặp mới với dữ liệu rõ ràng
      {
        id: "3",
        title: "Kỷ niệm 2 năm yêu nhau, trùng ngày Trung Thu luôn",
        date: "2024-09-17",
        location: "Nhà Văn Hoá Sinh Viên",
        description: "Đi mua đồ ăn rồi qua nhà văn hoá ngồi ăn, nói chiện, đưa quà, rồi đi về, khong có ôm hôn gì luon",
        rating: 1,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 2,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "4",
        title: "Đi ăn, ngồi nói chuyện",
        date: "2024-09-18",
        location: "Quán bánh canh cua Hoàng Diệu 2, KTX khu B",
        description: "Đi ăn xong về ngồi ở hồ bán nguyệt, Nguyên đưa quà cho AnhQuan, ròi đưa bóp của Nguyên bắt AnhQuan về giặt nựa(Anhquan dang thuong), ngồi nói chiện xíu thì mưa nên chạy dìa",
        rating: 4,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 2,     // Ví dụ: 2 giờ
        durationMinutes: 30,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "5",
        title: "Đưa trà sữa, trả bóp cho Nguyên, lấy quà",
        date: "2024-09-21",
        location: "Sau toà B3 KTX khu B",
        description: "AnhQuan giabo mua trà sữa để gặp Nguyên rồi trả bóp đã giặt xong và lấy quà(khung ảnh)",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 2,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "6",
        title: "Đi ăn",
        date: "2024-09-26",
        location: "Quán bún đỏ Hoàng Diệu 2",
        description: "Ăn xong đi về mua trà sữa tuk tuk rồi về",
        rating: 3,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 45,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "7",
        title: "Tặng hoa cho Nguyên",
        date: "2024-10-02",
        location: "Bên hông toà B3 trước nhà xe",
        description: "Hôm đó thấy hoa đẹp mà rẻ do người ta mới mở tiệm á, nên mua lun cho người đẹp, hê hê",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 20,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "8",
        title: "Đi BHX mua đồ",
        date: "2024-10-09",
        location: "BHX đường số 8",
        description: "Hôm Nguyên rủ đi mua đồ thế là đi mua đồ",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 30,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "9",
        title: "Đi ăn tối, đưa quà 20/10",
        date: "2024-19-10",
        location: "Không nhớ ăn ở mô",
        description: "Đưa quà 20/10 trước tại 20/10 Anhquan về quê, biets gi khong, hom do đi lấy hoa mà mưa quá trời luon, uot mlem melm",
        rating: 5,
        hugs: 1,
        kisses: 1,
        handHolds: 0,
        durationHours: 1,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "10",
        title: "Đưa một bông hoa nhỏ nhân dịp Nguyên được SV5T",
        date: "2024-10-28",
        location: "Sau toà Nguyên",
        description: "Tặng 1 bông hoa với lại mua cho nhỏ ly matcha sữa gạo rang cho nó tỉnh ngủ mà nhỏ bảo hong thích matcha",
        rating: 5,
        hugs: 1,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 5,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "11",
        title: "Dụ Nguyên đi sinh nhật AnhQuan",
        date: "2024-11-01",
        location: "Nhà văn hoá sinh viên, Yes coffee",
        description: "Đi xem phim tội nghiệp Vinh, xong rồi về cafe ngụ, được ôm, hôn Nguyên, thích quá chời, mà Nguyên khong ôm mình",
        rating: 5,
        hugs: 1,
        kisses: 1,
        handHolds: 1,
        durationHours: 8,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "12",
        title: "Đi BHX ",
        date: "2024-11-07",
        location: "BHX đường số 8",
        description: "Nguyên rủ đi mua đồ",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 1,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "13",
        title: "Đi ăn bánh canh",
        date: "2024-11-27",
        location: "Hoàng Diệu 2 - chắc là thế",
        description: "Đi ăn mô hong nhớ nữa mà ăn bánh canh thì khả năng cao là Hoàng Diệu 2",
        rating: 5,
        hugs: 1,
        kisses: 0,
        handHolds: 1,
        durationHours: 1,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "14",
        title: "Đi mua đồ ăn, Nguyên đưa quà sinh nhật",
        date: "2024-12-25",
        location: "KTX khu B",
        description: "Đi mua lạp xưởng nướng đá thì phải, xong lấy quà Nguyên đưa, quá bùn vì không được đi chơi noel, AnhQuan khong mang theo quà xuống",
        rating: 2,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 1,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "15",
        title: "Đưa Nguyên đi nhổ răng khôn",
        date: "2024-12-30",
        location: "Bệnh viện bên quận 5",
        description: "Dược đi chung với Nguyên, lúc ngồi chờ khám đòi ôm Nguyên xíu mà Nguyên khong cho, buồn hiuuuuuuuuuuu",
        rating: 4,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 4,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "16",
        title: "Đi ăn, đi dạo, ngồi chơi, có Tài Linh",
        date: "2025-01-19",
        location: "Hồ đá Khu Quân sự",
        description: "Đi lung tung, ra hồ đá ngồi chơi rồi về",
        rating: 4,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 3,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "17",
        title: "Đi thăm thầy cô dịp Tết",
        date: "2025-02-01",
        location: "Đồng Xoài",
        description: "Đi thăm thầy cô, chở Nguyên mà Nguyên khong ôm mình, nhớ Tết của 1 năm trước vui hơn nhiều",
        rating: 4,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 9,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "18",
        title: "Qua nhà Linh chơi bài",
        date: "2025-02-02",
        location: "Nhà Linh",
        description: "AnhQuan ngu quen, qua la buon luon, huhu, ngu mat tieu lam gap Nguyen duoc co 30p",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 30,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "19",
        title: "Đưa hàng shopee",
        date: "2025-02-12",
        location: "KTX khu B",
        description: "khong nhớ hàng gì nựa",
        rating: 4,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 2,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "20",
        title: "Valentine",
        date: "2025-02-14",
        location: "Nhà Văn Hoá Sinh Viên",
        description: "Đi ăn, xem phim, chụp photobooth",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 3,     // Ví dụ: 2 giờ
        durationMinutes: 45,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "21",
        title: "Đi ăn bánh canh, đi go",
        date: "2025-03-03",
        location: "Go Dĩ An, Hoàng Diệu 2",
        description: "Khong nhớ chi hết trơn",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 2,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "22",
        title: "8-3",
        date: "2025-08-03",
        location: "Buffet bên Tô Vĩnh Diện",
        description: "Đi ăn buffet có Tài Linh",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 4,     // Ví dụ: 2 giờ
        durationMinutes: 30,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "23",
        title: "Đi ăn Sinh Nhật Linh",
        date: "2025-03-27",
        location: "Ăn gà ở Jollibee, xong đi qua KiCa rồi đi qua quán Cafe",
        description: "Mẽo mèo meo luôn",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 3,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "24",
        title: "Đưa đồ đá banh",
        date: "2025-04-03",
        location: "Trước toà B5 KTX khu B",
        description: "Bữa đặt áo với mấy thằng xong đặt cho Nguyên luôn",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 3,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "25",
        title: "Chở Nguyên đi khám răng",
        date: "2025-04-13",
        location: "Nha khoa gì đó bên quận 9",
        description: "Đi khám để chuẩn bị niềng thì phải",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 2,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "26",
        title: "Đưa quà sinh Nhật",
        date: "2025-04-14",
        location: "Sau toà B3 KTX khu B",
        description: "Mang quà sinh nhật qua trước",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 5,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "27",
        title: "Sinh nhật Nguyên",
        date: "2025-04-15",
        location: "Nhà hàng BAO",
        description: "Đi ăn nhà hàng đồ đó",
        rating: 5,
        hugs: 1,
        kisses: 0,
        handHolds: 0,
        durationHours: 3,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "28",
        title: "Lấy lại đồ giặt ủi",
        date: "2025-05-04",
        location: "Trước toà B5 KTX khu B",
        description: "Thấy Nguyên không ở phòng nên nhờ lấy hộ đồ giặt ủi",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 1,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "29",
        title: "1000 ngày yêu nhau",
        date: "2025-06-13",
        location: "Quán panacotta gần Hoàng Diệu 2",
        description: "Mắc cười lắm, 1000 ngày trùng với ngày sinh nhật của KN luôn, tính nói mà sợ bị chựi",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 2,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "30",
        title: "Đi Vũng Tàu",
        date: "2025-06-27",
        location: "Vũng Tàu",
        description: "Đi nghỉ dưỡng đồ đó",
        rating: 5,
        hugs: 2,
        kisses: 3,
        handHolds: 2,
        durationHours: 55,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "31",
        title: "Đi lên lại Sài Gòn",
        date: "2025-07-06",
        location: "Đồng Xoài - Sài Gòn",
        description: "Chạm đúng 2s",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 2,
      },
      {
        id: "32",
        title: "Đi ăn đồ Thái, uống trà sữa tuk tuk",
        date: "2025-08-10",
        location: "Đường số mấy đó gần ĐH Ngân Hàng, quán tuk tuk",
        description: "Đi ăn với Tài Linh, Nguyên vừa uốn trà sữa vừa chạy dealine",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 3,     // Ví dụ: 2 giờ
        durationMinutes: 0,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
      {
        id: "33",
        title: "Lấy lại VitVangDangYeu",
        date: "2025-09-04",
        location: "Sau toà B3 KTX khu B",
        description: "Qua lấy lại VitVang tại bữa về quê nhờ Nguyên giữ hộ",
        rating: 5,
        hugs: 0,
        kisses: 0,
        handHolds: 0,
        durationHours: 0,     // Ví dụ: 2 giờ
        durationMinutes: 3,  // Ví dụ: 30 phút
        durationSeconds: 0,
      },
    ]);
    setPersonalInfo({
      person1: {
        name: "",
        birthday: "",
        hobby: "",
        nickname: "",
      },
      person2: {
        name: "",
        birthday: "",
        hobby: "",
        nickname: "",
      },
    });
    toast.success("Đã làm mới dữ liệu! Dữ liệu đã trở về mặc định.");
  };

  // Sắp xếp meetings theo ngày mới nhất lên trên (YYYY-MM-DD)
const sortedMeetings = [...meetings].sort((a, b) => {
  // Sử dụng trực tiếp Date vì dữ liệu đã là YYYY-MM-DD
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

  return (
    <div className="min-h-screen romantic-gradient p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-primary animate-heartbeat" fill="currentColor" />
            <h1 className="text-3xl font-bold love-gradient bg-clip-text text-transparent">
              Love Story Quan with Nguyen
            </h1>
          </div>
          {/* Thêm nút refresh cạnh nút đăng xuất */}
          <div className="flex space-x-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
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
                <Label htmlFor="love-start-date" className="text-sm">
                  Ngày bắt đầu
                </Label>
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
              <CardDescription>Số lần gặp nhau kể từ tháng 7/2024</CardDescription>
            </CardHeader>
          </Card>

          <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <Star className="w-8 h-8 text-accent mx-auto" fill="currentColor" />
              <CardTitle className="text-2xl font-bold text-accent">
                {meetings.length > 0
                  ? (meetings.reduce((sum, m) => sum + m.rating, 0) / meetings.length).toFixed(1)
                  : 0}
                /5
              </CardTitle>
              <CardDescription>Điểm hạnh phúc TB</CardDescription>
            </CardHeader>
          </Card>

          {/* Ô tổng hợp mới */}
          <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <Users className="w-8 h-8 text-primary mx-auto" />
              <CardTitle className="text-2xl font-bold text-primary">
                {meetings.reduce((sum, m) => sum + m.hugs, 0)} /{" "}
                {meetings.reduce((sum, m) => sum + m.kisses, 0)} /{" "}
                {meetings.reduce((sum, m) => sum + m.handHolds, 0)} 💕
              </CardTitle>
              <CardDescription>Ôm / Hôn / Nắm tay 💕</CardDescription>
            </CardHeader>
          </Card>
          <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto" /> {/* Hoặc icon khác */}
              <CardTitle className="text-2xl font-bold text-primary">
                {totalHours} giờ <br />
                {totalMinutes} phút <br />
                {totalGiay} giây
              </CardTitle>
              <CardDescription>Tổng thời gian gặp</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Personal Info Section */}
        <div className="mb-8">
          <PersonalInfoForm personalInfo={personalInfo} onUpdate={handleUpdatePersonalInfo} />
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
              {/* Sửa: Đặt hai nút cạnh nhau */}
              <div className="flex space-x-2">
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
                <Button
                  onClick={() => setShowMeetings(!showMeetings)}
                  variant="outline"
                  className="love-gradient text-white hover:scale-[1.02] transition-all"
                >
                  {showMeetings ? "Ẩn danh sách" : "Hiện danh sách"} {showMeetings ? <ArrowUp className="w-4 h-4 ml-2" /> : <ArrowDown className="w-4 h-4 ml-2" />}
                </Button>
              </div>
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

            {/* Xóa nút ẩn/hiện ở đây vì đã chuyển lên CardHeader */}
            {/* ...existing code... */}

            {showMeetings && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedMeetings.map((meeting) => (
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
            )}

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
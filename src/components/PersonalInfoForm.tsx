import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Edit, Check, X } from "lucide-react";

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

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onUpdate: (info: PersonalInfo) => void;
}

const PersonalInfoForm = ({ personalInfo, onUpdate }: PersonalInfoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(personalInfo);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(personalInfo);
    setIsEditing(false);
  };

  return (
    <Card className="soft-shadow bg-white/90 backdrop-blur-sm border-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Thông tin cá nhân</span>
            </CardTitle>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Edit className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={handleSave}
                size="sm"
                className="love-gradient text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Lưu
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="sm"
              >
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Person 1 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Anh</h3>
            <div>
              <Label htmlFor="person1-name">Tên</Label>
              <Input
                id="person1-name"
                value={formData.person1.name}
                onChange={(e) => setFormData({
                  ...formData,
                  person1: { ...formData.person1, name: e.target.value }
                })}
                disabled={!isEditing}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="person1-birthday">Sinh nhật</Label>
              <Input
                id="person1-birthday"
                type="date"
                value={formData.person1.birthday}
                onChange={(e) => setFormData({
                  ...formData,
                  person1: { ...formData.person1, birthday: e.target.value }
                })}
                disabled={!isEditing}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="person1-hobby">Sở thích</Label>
              <Input
                id="person1-hobby"
                value={formData.person1.hobby}
                onChange={(e) => setFormData({
                  ...formData,
                  person1: { ...formData.person1, hobby: e.target.value }
                })}
                disabled={!isEditing}
                placeholder="Đọc sách, xem phim..."
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="person1-nickname">ID</Label>
              <Input
                id="person1-nickname"
                value={formData.person1.nickname}
                onChange={(e) => setFormData({
                  ...formData,
                  person1: { ...formData.person1, nickname: e.target.value }
                })}
                disabled={!isEditing}
                placeholder="Biệt danh thân mật..."
                className="border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Person 2 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Em</h3>
            <div>
              <Label htmlFor="person2-name">Tên</Label>
              <Input
                id="person2-name"
                value={formData.person2.name}
                onChange={(e) => setFormData({
                  ...formData,
                  person2: { ...formData.person2, name: e.target.value }
                })}
                disabled={!isEditing}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="person2-birthday">Sinh nhật</Label>
              <Input
                id="person2-birthday"
                type="date"
                value={formData.person2.birthday}
                onChange={(e) => setFormData({
                  ...formData,
                  person2: { ...formData.person2, birthday: e.target.value }
                })}
                disabled={!isEditing}
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="person2-hobby">Sở thích</Label>
              <Input
                id="person2-hobby"
                value={formData.person2.hobby}
                onChange={(e) => setFormData({
                  ...formData,
                  person2: { ...formData.person2, hobby: e.target.value }
                })}
                disabled={!isEditing}
                placeholder="Du lịch, nấu ăn..."
                className="border-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="person2-nickname">ID</Label>
              <Input
                id="person2-nickname"
                value={formData.person2.nickname}
                onChange={(e) => setFormData({
                  ...formData,
                  person2: { ...formData.person2, nickname: e.target.value }
                })}
                disabled={!isEditing}
                placeholder="Biệt danh thân mật..."
                className="border-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
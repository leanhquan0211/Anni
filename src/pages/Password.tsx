import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Password = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Simple password check - in real app, this would be more secure
  const correctPassword = "love2024";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate checking
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === correctPassword) {
      toast.success("Chào mừng bạn! 💕");
      navigate("/dashboard");
    } else {
      toast.error("Mật khẩu không đúng, thử lại nhé! 💔");
      setPassword("");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen romantic-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="soft-shadow border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Nhập Mật Khẩu
            </CardTitle>
            <CardDescription className="text-foreground/60">
              Hãy nhập mật khẩu để vào khu vực riêng tư của chúng ta
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center text-lg py-6 border-primary/20 focus:border-primary"
                />
              </div>
              
              <Button
                type="submit"
                disabled={!password || isLoading}
                className="w-full love-gradient text-white py-6 text-lg font-medium hover:scale-[1.02] transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Đang kiểm tra...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" fill="currentColor" />
                    <span>Vào thôi!</span>
                  </div>
                )}
              </Button>
            </form>

            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="w-full text-foreground/60 hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </CardContent>
        </Card>

        {/* Hint */}
        <div className="text-center mt-4 text-sm text-foreground/50">
          💡 Gợi ý: love2024
        </div>
      </div>
    </div>
  );
};

export default Password;
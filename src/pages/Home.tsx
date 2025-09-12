import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/password");
  };

  return (
    <div className="min-h-screen romantic-gradient flex items-center justify-center p-4">
      <div className="text-center space-y-8 animate-float">
        {/* Hearts decoration */}
        <div className="flex justify-center space-x-4 mb-8">
          <Heart className="w-6 h-6 text-primary animate-heartbeat" fill="currentColor" />
          <Sparkles className="w-6 h-6 text-accent animate-pulse" fill="currentColor" />
          <Heart className="w-6 h-6 text-primary animate-heartbeat" fill="currentColor" />
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h1 className="text-6xl font-bold love-gradient bg-clip-text text-transparent">
            Anniversary
          </h1>
          <p className="text-xl text-foreground/80 max-w-md mx-auto">
            Nơi lưu giữ tình cảm 💕
          </p>
        </div>

        {/* Start button */}
        <div className="pt-8">
          <Button
            onClick={handleStart}
            size="lg"
            className="love-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-12 py-6 text-lg love-shadow"
          >
            <Heart className="w-5 h-5 mr-2" fill="currentColor" />
            Bắt đầu
          </Button>
        </div>

        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Heart className="absolute top-20 left-10 w-4 h-4 text-primary/30 animate-float" fill="currentColor" />
          <Heart className="absolute top-40 right-20 w-3 h-3 text-accent/40 animate-pulse" fill="currentColor" />
          <Heart className="absolute bottom-32 left-20 w-5 h-5 text-primary/20 animate-heartbeat" fill="currentColor" />
          <Heart className="absolute bottom-20 right-10 w-4 h-4 text-accent/30 animate-float" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export default Home;
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Sound DNS</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Trải nghiệm âm nhạc với giao diện giống Spotify.
        </p>
        <Link to="/music-player">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full">
            Khởi chạy Trình phát nhạc
          </Button>
        </Link>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;
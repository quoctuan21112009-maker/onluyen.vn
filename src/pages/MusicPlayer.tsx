"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';

const MusicPlayer = () => {
  const [songTitle, setSongTitle] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPlayingTitle, setCurrentPlayingTitle] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!songTitle.trim()) {
      showError('Vui lòng nhập tên bài hát.');
      return;
    }

    setIsLoading(true);
    setAudioUrl(null);
    setCurrentPlayingTitle(null);
    const loadingToastId = showLoading(`Đang tìm kiếm "${songTitle}"...`);

    try {
      // Đây là một placeholder cho cuộc gọi API backend của bạn.
      // Bạn đã đề cập đến một backend Flask sẽ xử lý /download?q=...
      // Để minh họa, tôi sẽ mô phỏng một phản hồi thành công sau một khoảng thời gian trễ.
      // Trong một kịch bản thực tế, bạn sẽ thay thế điều này bằng cuộc gọi fetch thực tế của mình.

      // const response = await fetch(`/download?q=${encodeURIComponent(songTitle)}`);
      // if (!response.ok) {
      //   throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
      // }
      // const data = await response.json();

      // Cuộc gọi API mô phỏng:
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mô phỏng độ trễ mạng
      const simulatedData = {
        url: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Math.floor(Math.random() * 10) + 1}.mp3`, // URL MP3 ví dụ
      };
      const data = simulatedData;

      if (data.url) {
        setAudioUrl(data.url);
        setCurrentPlayingTitle(songTitle);
        showSuccess(`Đã tìm thấy và sẵn sàng phát: "${songTitle}"`);
      } else {
        showError(`Không thể tìm thấy bài hát cho "${songTitle}".`);
      }
    } catch (error) {
      console.error('Lỗi khi tìm nạp âm thanh:', error);
      showError(`Không thể tìm nạp âm thanh cho "${songTitle}". Vui lòng đảm bảo backend của bạn đang chạy và có thể truy cập.`);
    } finally {
      setIsLoading(false);
      dismissToast(loadingToastId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-lg bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-white">Sound DNS Player</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Nhập tên bài hát hoặc nghệ sĩ..."
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="flex-grow bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleSearch} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
            </Button>
          </div>

          {currentPlayingTitle && (
            <div className="text-center text-lg text-gray-300">
              Đang phát: <span className="font-semibold">{currentPlayingTitle}</span>
            </div>
          )}

          {audioUrl && (
            <div className="w-full">
              <audio controls src={audioUrl} className="w-full rounded-md bg-gray-700">
                Trình duyệt của bạn không hỗ trợ phần tử âm thanh.
              </audio>
            </div>
          )}

          {!audioUrl && !isLoading && (
            <p className="text-center text-gray-400">
              Nhập tên bài hát ở trên để bắt đầu phát nhạc.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicPlayer;
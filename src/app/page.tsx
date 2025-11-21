"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Chatbot } from '@/components/Chatbot';
import { MapView } from '@/components/MapView';
import { PlacePopup } from '@/components/PlacePopup';

export type Screen = 'initial' | 'chatResponse' | 'placeDetail';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>('initial');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  const [route, setRoute] = useState<Location[]>([]);

  const handleSendMessage = (message: string) => {
    const newMessages = [...messages, { role: 'user' as const, content: message }];
    setMessages(newMessages);

    // Historic sites recommendation simulation
    if (message.toLowerCase().includes('historic') && (message.toLowerCase().includes('recommend') || message.toLowerCase().includes('suggest'))) {
      setTimeout(() => {
        const response = {
          role: 'assistant' as const,
          content: 'I recommend Gyeongbokgung Palace, Seodaemun Prison History Hall, and Changdeokgung Palace'
        };
        setMessages([...newMessages, response]);

        // Set route
        const recommendedRoute: Location[] = [
          { name: 'Changdeokgung', lat: 37.5794, lng: 126.9910 },
          { name: 'Gyeongbokgung', lat: 37.5796, lng: 126.9770 },
          { name: 'Seodaemun Prison', lat: 37.5744, lng: 126.9587 }
        ];
        setRoute(recommendedRoute);
        setScreen('chatResponse');
      }, 500);
    }
  };

  const handlePlaceClick = (place: Location) => {
    setSelectedPlace(place);
    setScreen('placeDetail');
  };

  const handleClosePopup = () => {
    setSelectedPlace(null);
    setScreen('chatResponse');
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      {/* Kroaddy 버튼 */}
      <Link
        href="/chat"
        className="absolute top-4 left-24 z-50 px-4 py-2 bg-gradient-to-r from-[#0088FF] to-[#FF383C] text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-medium shadow-lg"
      >
        ChatGPT
      </Link>

      {/* 사이드바 */}
      <Sidebar />

      {/* 챗봇 (첫 번째, 두 번째 화면에만 표시) */}
      {(screen === 'initial' || screen === 'chatResponse') && (
        <div className="w-1/2 flex flex-col border-r">
          <Chatbot
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      )}

      {/* 장소 상세 팝업 (세 번째 화면) */}
      {screen === 'placeDetail' && selectedPlace && (
        <PlacePopup
          place={selectedPlace}
          onClose={handleClosePopup}
        />
      )}

      {/* 지도 */}
      <div className={screen === 'placeDetail' ? 'flex-1' : 'w-1/2'}>
        <MapView
          route={route}
          onPlaceClick={handlePlaceClick}
          showRoute={screen === 'chatResponse'}
        />
      </div>
    </div>
  );
}

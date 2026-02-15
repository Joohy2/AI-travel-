import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Search, Plane } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onNext: (country: string) => void;
}

export function HomePage({ onNext }: HomePageProps) {
  const [selectedCountry, setSelectedCountry] = useState("");

  const popularDestinations = [
    { 
      name: "일본", 
      nameEn: "Japan",
      cities: "도쿄, 오사카, 교토",
      emoji: "🇯🇵",
      avgPrice: "80만원~"
    },
    { 
      name: "태국", 
      nameEn: "Thailand",
      cities: "방콕, 푸켓, 치앙마이",
      emoji: "🇹🇭",
      avgPrice: "90만원~"
    },
    { 
      name: "베트남", 
      nameEn: "Vietnam",
      cities: "다낭, 호치민, 하노이",
      emoji: "🇻🇳",
      avgPrice: "70만원~"
    },
    { 
      name: "프랑스", 
      nameEn: "France",
      cities: "파리, 니스, 리옹",
      emoji: "🇫🇷",
      avgPrice: "200만원~"
    },
    { 
      name: "미국", 
      nameEn: "USA",
      cities: "뉴욕, LA, 샌프란시스코",
      emoji: "🇺🇸",
      avgPrice: "250만원~"
    },
    { 
      name: "스페인", 
      nameEn: "Spain",
      cities: "바르셀로나, 마드리드",
      emoji: "🇪🇸",
      avgPrice: "180만원~"
    },
    { 
      name: "싱가포르", 
      nameEn: "Singapore",
      cities: "싱가포르",
      emoji: "🇸🇬",
      avgPrice: "120만원~"
    },
    { 
      name: "영국", 
      nameEn: "UK",
      cities: "런던, 에든버러",
      emoji: "🇬🇧",
      avgPrice: "220만원~"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-16 pt-16">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-500 rounded-full p-8">
              <Plane className="size-20 text-white" />
            </div>
          </div>
          <h1 className="text-6xl mb-6 text-blue-600">
            AI 여행 플래너
          </h1>
          <p className="text-2xl text-gray-600">
            어디로 떠나고 싶으신가요?
          </p>
        </div>

        {/* 검색 바 */}
        <Card className="p-8 mb-16 bg-white shadow-xl max-w-4xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-6 text-gray-400" />
              <input
                type="text"
                placeholder="나라 또는 도시를 검색하세요 (예: 일본, 도쿄)"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none text-xl"
              />
            </div>
            <Button
              onClick={() => selectedCountry && onNext(selectedCountry)}
              disabled={!selectedCountry}
              className="bg-blue-500 hover:bg-blue-600 text-white px-12 rounded-xl text-xl h-[68px]"
            >
              검색
            </Button>
          </div>
        </Card>

        {/* 인기 여행지 */}
        <div className="mb-12">
          <h2 className="text-3xl mb-8 text-gray-800">인기 여행지</h2>
          <div className="grid grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Card
                key={destination.name}
                className="p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105 bg-white"
                onClick={() => onNext(destination.name)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{destination.emoji}</div>
                  <h3 className="text-2xl mb-2">{destination.name}</h3>
                  <p className="text-base text-gray-500 mb-3">{destination.nameEn}</p>
                  <p className="text-sm text-gray-400 mb-4">{destination.cities}</p>
                  <div className="bg-blue-50 text-blue-600 text-base py-3 px-4 rounded-lg font-medium">
                    {destination.avgPrice}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
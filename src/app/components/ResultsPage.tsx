import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { MapPin, Clock, DollarSign, Star, Navigation, Utensils, Camera, TrendingDown, Sparkles, Waves, Plane } from "lucide-react";
import { RouteMap } from "./RouteMap";

interface ResultsPageProps {
  country: string;
  options: string[];
  prompt: string;
  onNext: (selectedRoute: string) => void;
  onBack: () => void;
}

export function ResultsPage({ country, options, prompt, onNext, onBack }: ResultsPageProps) {
  const [selectedRoute, setSelectedRoute] = useState<string>("optimal");

  const routes = {
    optimal: {
      name: "최적 경로",
      icon: Sparkles,
      color: "blue",
      totalCost: "112만원",
      duration: "3박 4일",
      score: 95,
      description: "가격과 일정의 완벽한 균형",
      highlights: ["인기 관광지 모두 포함", "이동 시간 최소화", "평균 대비 8% 저렴"],
      days: [
        { day: 1, activities: ["인천공항 출발 10:00", "호텔 체크인", "해변 산책", "현지 맛집 저녁"] },
        { day: 2, activities: ["오션뷰 카페", "명소 투어", "인플루언서 추천 루트", "선셋 포토 스팟"] },
        { day: 3, activities: ["수상 액티비티", "쇼핑 거리", "야시장 탐방", "호텔 휴식"] },
      ]
    },
    budget: {
      name: "가성비 경로",
      icon: TrendingDown,
      color: "green",
      totalCost: "89만원",
      duration: "3박 4일",
      score: 88,
      description: "최저가로 알찬 여행",
      highlights: ["최저가 항공편", "가성비 숙소", "무료 관광지 위주"],
      days: [
        { day: 1, activities: ["심야 항공편 23:50", "공항 근처 숙소", "아침 해변", "로컬 맛집"] },
        { day: 2, activities: ["무료 박물관", "해변 산책", "재래시장 탐방", "저렴한 맛집"] },
        { day: 3, activities: ["트레킹", "무료 전망대", "카페 거리", "조조 항공편 준비"] },
      ]
    },
    oceanview: {
      name: "오션뷰 경로",
      icon: Waves,
      color: "cyan",
      totalCost: "145만원",
      duration: "3박 4일",
      score: 92,
      description: "바다를 최대한 즐기는 일정",
      highlights: ["오션뷰 리조트", "해변 중심 일정", "수상 액티비티 포함"],
      days: [
        { day: 1, activities: ["오전 항공편", "오션뷰 리조트 체크인", "프라이빗 비치", "선셋 디너"] },
        { day: 2, activities: ["스노클링", "요트 투어", "해변 카페", "오션뷰 레스토랑"] },
        { day: 3, activities: ["서핑 레슨", "해변 마사지", "시푸드 맛집", "비치 파티"] },
      ]
    }
  };

  const currentRoute = routes[selectedRoute as keyof typeof routes];
  const RouteIcon = currentRoute.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-[1600px] mx-auto py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 px-8 py-3 rounded-full mb-6 text-lg">
              {country} 여행
            </div>
            <h1 className="text-5xl mb-4 text-blue-600">
              AI 분석 완료!
            </h1>
            <p className="text-xl text-gray-600">
              여러 조합을 비교 분석한 결과입니다
            </p>
          </div>

          {/* 경로 선택 탭 */}
          <Tabs value={selectedRoute} onValueChange={setSelectedRoute} className="mb-12">
            <TabsList className="grid grid-cols-3 w-full h-16">
              {Object.entries(routes).map(([key, route]) => {
                const Icon = route.icon;
                return (
                  <TabsTrigger key={key} value={key} className="flex items-center gap-2 text-lg">
                    <Icon className="size-5" />
                    {route.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* 선택된 경로 상세 정보 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 왼쪽: 지도 영역 */}
            <Card className="p-6 bg-gray-50">
              <div className="aspect-square rounded-xl overflow-hidden">
                <RouteMap 
                  routeName={selectedRoute} 
                  color={selectedRoute === 'budget' ? 'green' : selectedRoute === 'oceanview' ? 'blue' : 'red'} 
                />
              </div>

              {/* 경로 하이라이트 */}
              <div className="mt-6 space-y-3">
                {currentRoute.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* 오른쪽: 비용 및 상세 정보 */}
            <div className="space-y-4">
              {/* 가격 비교 카드 */}
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <h3 className="text-xl mb-4">💰 가격 분석</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>최저가:</span>
                    <span className="font-semibold">89만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>평균가:</span>
                    <span className="font-semibold">112만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>최고가:</span>
                    <span className="font-semibold">145만원</span>
                  </div>
                  <div className="border-t border-white/30 pt-2 mt-2">
                    <div className="flex justify-between text-lg">
                      <span>현재 선택:</span>
                      <span className="font-bold">{currentRoute.totalCost}</span>
                    </div>
                    <p className="text-xs mt-1 opacity-90">
                      평균 대비 {selectedRoute === 'budget' ? '21% 저렴' : selectedRoute === 'optimal' ? '균형잡힌 선택' : '29% 프리미엄'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* 여행 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <Clock className="size-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">여행 기간</p>
                  <p className="font-semibold">{currentRoute.duration}</p>
                </Card>
                <Card className="p-4 text-center">
                  <Star className="size-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">추천 점수</p>
                  <p className="font-semibold">{currentRoute.score}/100</p>
                </Card>
              </div>

              {/* 일정 미리보기 */}
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Navigation className="size-5 text-blue-500" />
                  일정 미리보기
                </h3>
                <div className="space-y-4">
                  {currentRoute.days.map((dayInfo) => (
                    <div key={dayInfo.day} className="border-l-4 border-blue-500 pl-4">
                      <p className="font-semibold text-blue-600 mb-2">Day {dayInfo.day}</p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {dayInfo.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400">→</span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* 추천 관광지 */}
          <Card className="p-6 mb-6 bg-blue-50">
            <h3 className="text-xl mb-4 text-blue-700 flex items-center gap-2">
              <Camera className="size-6" />
              AI 추천 관광지
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "해변 선셋 포인트", time: "17:30 추천", type: "사진 명소" },
                { name: "현지 맛집 거리", time: "19:00 추천", type: "맛집" },
                { name: "인플루언서 추천 카페", time: "14:00 추천", type: "카페" },
              ].map((spot, i) => (
                <div key={i} className="bg-white p-4 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{spot.name}</h4>
                    {spot.type === "맛집" ? (
                      <Utensils className="size-4 text-orange-500" />
                    ) : (
                      <Camera className="size-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{spot.time}</p>
                  <p className="text-xs text-blue-600 mt-1">{spot.type}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-6 rounded-full text-lg"
            >
              다시 설정
            </Button>
            <Button
              onClick={() => onNext(selectedRoute)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-full text-lg"
            >
              이 일정으로 예약하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
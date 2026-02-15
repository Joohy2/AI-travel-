import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";
import {
  Mountain,
  Waves,
  Building2,
  Sparkles,
  TreePine,
  Castle,
  Camera,
  ShoppingBag,
  Utensils,
  Coffee,
  Palette,
  Music,
  CalendarIcon,
  MessageSquare,
  Lightbulb,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface OptionsPageProps {
  country: string;
  onNext: (options: string[], prompt: string) => void;
  onBack: () => void;
}

export function OptionsPage({
  country,
  onNext,
  onBack,
}: OptionsPageProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    string[]
  >([]);

  const travelStyles = [
    {
      id: "mountain",
      label: "산/자연",
      icon: Mountain,
      color: "green",
    },
    {
      id: "ocean",
      label: "바다/해변",
      icon: Waves,
      color: "blue",
    },
    {
      id: "city",
      label: "도시/관광",
      icon: Building2,
      color: "purple",
    },
    {
      id: "resort",
      label: "리조트",
      icon: Sparkles,
      color: "pink",
    },
    {
      id: "forest",
      label: "숲/트레킹",
      icon: TreePine,
      color: "emerald",
    },
    {
      id: "historic",
      label: "역사/문화",
      icon: Castle,
      color: "amber",
    },
    {
      id: "photo",
      label: "사진 명소",
      icon: Camera,
      color: "indigo",
    },
    {
      id: "shopping",
      label: "쇼핑",
      icon: ShoppingBag,
      color: "rose",
    },
    {
      id: "food",
      label: "맛집 탐방",
      icon: Utensils,
      color: "orange",
    },
    {
      id: "cafe",
      label: "카페 투어",
      icon: Coffee,
      color: "yellow",
    },
    {
      id: "art",
      label: "예술/전시",
      icon: Palette,
      color: "violet",
    },
    {
      id: "music",
      label: "음악/공연",
      icon: Music,
      color: "fuchsia",
    },
  ];

  const budgetOptions = [
    {
      id: "budget",
      label: "가성비 여행",
      range: "~100만원",
    },
    {
      id: "standard",
      label: "일반 여행",
      range: "100~200만원",
    },
    {
      id: "premium",
      label: "프리미엄 여행",
      range: "200만원~",
    },
  ];

  const [selectedBudget, setSelectedBudget] = useState("");
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [prompt, setPrompt] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id)
        ? prev.filter((o) => o !== id)
        : [...prev, id],
    );
  };

  const handleNext = () => {
    if (
      selectedOptions.length > 0 &&
      selectedBudget &&
      dateRange.from &&
      dateRange.to
    ) {
      onNext([...selectedOptions, selectedBudget], prompt);
    }
  };

  const colorMap: Record<string, string> = {
    green: "bg-green-500 border-green-600",
    blue: "bg-blue-500 border-blue-600",
    purple: "bg-purple-500 border-purple-600",
    pink: "bg-pink-500 border-pink-600",
    emerald: "bg-emerald-500 border-emerald-600",
    amber: "bg-amber-500 border-amber-600",
    indigo: "bg-indigo-500 border-indigo-600",
    rose: "bg-rose-500 border-rose-600",
    orange: "bg-orange-500 border-orange-600",
    yellow: "bg-yellow-500 border-yellow-600",
    violet: "bg-violet-500 border-violet-600",
    fuchsia: "bg-fuchsia-500 border-fuchsia-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-[1400px] mx-auto py-12">
        <Card className="bg-white rounded-3xl shadow-2xl p-12 md:p-16">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 px-8 py-3 rounded-full mb-6 text-lg">
              {country} 여행
            </div>
            <h1 className="text-5xl text-blue-600 mb-4">
              어떤 여행을 원하시나요?
            </h1>
            <p className="text-xl text-gray-600">
              원하시는 여행 스타일을 모두 선택해주세요 (복수선택
              가능)
            </p>
          </div>

          {/* 날짜 선택 - 첫번째 */}
          <div className="mb-12">
            <h2 className="text-2xl mb-6 text-gray-800 text-center">
              여행 기간
            </h2>
            <Card className="p-8 bg-blue-50 border-blue-200">
              <div className="flex justify-center">
                <Popover
                  open={showCalendar}
                  onOpenChange={setShowCalendar}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full max-w-2xl justify-center text-center font-medium h-16 text-xl tracking-wide"
                    >
                      <CalendarIcon className="mr-3 size-6" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <span className="font-semibold">
                            {format(
                              dateRange.from,
                              "MMM d, yyyy",
                            )}{" "}
                            -{" "}
                            {format(
                              dateRange.to,
                              "MMM d, yyyy",
                            )}
                          </span>
                        ) : (
                          <span className="font-semibold">
                            {format(
                              dateRange.from,
                              "MMM d, yyyy",
                            )}
                          </span>
                        )
                      ) : (
                        <span className="text-gray-500 font-normal">
                          날짜 선택
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white shadow-2xl rounded-2xl"
                    align="center"
                  >
                    <div className="p-6">
                      {/* 헤더 */}
                      <div className="text-center mb-6 pb-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">
                          여행 기간 선택
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          시작일과 종료일을 선택해주세요
                        </p>
                      </div>

                      {/* 캘린더 */}
                      <Calendar
                        mode="range"
                        selected={{
                          from: dateRange.from,
                          to: dateRange.to,
                        }}
                        onSelect={(selected) => {
                          if (selected) {
                            setDateRange(selected);
                            if (selected.from && selected.to) {
                              setShowCalendar(false);
                            }
                          }
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="[&_.months]:flex [&_.month]:gap-2 [&_.caption_label]:text-lg [&_.caption_label]:font-semibold [&_.caption_label]:text-blue-600 [&_.head_cell]:font-semibold [&_.head_cell]:text-gray-600"
                      />

                      {/* 선택 정보 표시 */}
                      {dateRange.from && dateRange.to && (
                        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                          <p className="text-sm text-gray-500 mb-2">
                            선택된 기간
                          </p>
                          <p className="text-lg font-bold text-blue-600">
                            {format(dateRange.from, "M월 d일")}{" "}
                            ~ {format(dateRange.to, "M월 d일")}
                          </p>
                        </div>
                      )}

                      {/* 버튼 */}
                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          className="flex-1 py-2 rounded-lg border-gray-300 hover:bg-gray-50"
                          onClick={() => setShowCalendar(false)}
                        >
                          취소
                        </Button>
                        {dateRange.from && dateRange.to && (
                          <Button
                            variant="outline"
                            className="flex-1 py-2 rounded-lg border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400"
                            onClick={() => {
                              setDateRange({});
                            }}
                          >
                            <X className="size-4 mr-1" />
                            초기화
                          </Button>
                        )}
                        <Button
                          disabled={
                            !dateRange.from || !dateRange.to
                          }
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => {
                            if (
                              dateRange.from &&
                              dateRange.to
                            ) {
                              setShowCalendar(false);
                            }
                          }}
                        >
                          확인
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {dateRange.from && dateRange.to && (
                <div className="mt-6 pt-5 border-t-2 border-blue-200 text-center relative">
                  <p className="text-xs font-semibold text-blue-600 mb-3 tracking-wide uppercase">
                    선택된 기간
                  </p>
                  <div className="flex items-baseline gap-2 justify-center">
                    <p className="text-3xl font-bold text-gray-900">
                      {format(dateRange.from, "M/d")} -{" "}
                      {format(dateRange.to, "M/d")}
                    </p>
                    <span className="text-base text-gray-500 font-medium">
                      (
                      {Math.ceil(
                        (dateRange.to.getTime() -
                          dateRange.from.getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}
                      일)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDateRange({})}
                    className="mt-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="size-4 mr-1" />
                    초기화
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* 예산 선택 - 두번째 */}
          <div className="mb-12">
            <h2 className="text-2xl mb-6 text-gray-800">예산</h2>
            <div className="grid grid-cols-3 gap-6">
              {budgetOptions.map((budget) => (
                <button
                  key={budget.id}
                  onClick={() => setSelectedBudget(budget.id)}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    selectedBudget === budget.id
                      ? "bg-blue-500 text-white border-blue-600 shadow-lg scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-md"
                  }`}
                >
                  <p className="text-xl font-semibold mb-2">
                    {budget.label}
                  </p>
                  <p className="text-base opacity-90">
                    {budget.range}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 여행 스타일 선택 - 세번째 */}
          <div className="mb-12">
            <h2 className="text-2xl mb-6 text-gray-800">
              여행 스타일
            </h2>
            <div className="grid grid-cols-6 gap-4">
              {travelStyles.map((style) => {
                const Icon = style.icon;
                const isSelected = selectedOptions.includes(
                  style.id,
                );
                return (
                  <button
                    key={style.id}
                    onClick={() => toggleOption(style.id)}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? `${colorMap[style.color]} text-white shadow-lg scale-105`
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-md"
                    }`}
                  >
                    <Icon className="size-12 mx-auto mb-3" />
                    <p className="text-base font-medium">
                      {style.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI 프롬프트 입력 - 네번째 */}
          <div className="mb-12">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="size-7 text-blue-600" />
                <h2 className="text-2xl text-blue-700">
                  AI에게 원하는 여행을 말해주세요
                </h2>
              </div>
              <p className="text-base text-gray-600 mb-6">
                구체적으로 알려주실수록 더 정확한 추천을 받을 수
                있습니다
              </p>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="예시: 일출 명소와 현지 맛집 위주로 일정을 짜주세요. 특히 SNS에서 유명한 카페를 꼭 넣어주세요."
                className="min-h-40 resize-none text-lg border-2 focus:border-blue-400"
              />
              <p className="text-sm text-gray-500 mt-4">
                💡 Tip: 선호하는 관광지 유형, 식당 분위기, 이동
                수단, 특별한 요청사항 등을 자유롭게 작성하세요
              </p>
            </Card>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-6 max-w-2xl mx-auto">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-7 rounded-full text-xl"
            >
              이전
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                selectedOptions.length === 0 ||
                !selectedBudget ||
                !dateRange.from ||
                !dateRange.to
              }
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-7 rounded-full text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
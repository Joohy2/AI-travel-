import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Search, Plane, Moon, Sun, Sparkles } from "lucide-react";

interface HomePageProps {
  onNext: (country: string) => void;
}

type TravelMood = "beach" | "city";

interface Destination {
  name: string;
  nameEn: string;
  cities: string;
  emoji: string;
  avgPrice: string;
  mood: TravelMood;
}

export function HomePage({ onNext }: HomePageProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [preferredMood, setPreferredMood] = useState<TravelMood>("beach");

  const popularDestinations: Destination[] = [
    {
      name: "일본",
      nameEn: "Japan",
      cities: "도쿄, 오사카, 교토",
      emoji: "🇯🇵",
      avgPrice: "80만원~",
      mood: "city",
    },
    {
      name: "태국",
      nameEn: "Thailand",
      cities: "방콕, 푸켓, 치앙마이",
      emoji: "🇹🇭",
      avgPrice: "90만원~",
      mood: "beach",
    },
    {
      name: "베트남",
      nameEn: "Vietnam",
      cities: "다낭, 호치민, 하노이",
      emoji: "🇻🇳",
      avgPrice: "70만원~",
      mood: "beach",
    },
    {
      name: "프랑스",
      nameEn: "France",
      cities: "파리, 니스, 리옹",
      emoji: "🇫🇷",
      avgPrice: "200만원~",
      mood: "city",
    },
    {
      name: "미국",
      nameEn: "USA",
      cities: "뉴욕, LA, 샌프란시스코",
      emoji: "🇺🇸",
      avgPrice: "250만원~",
      mood: "city",
    },
    {
      name: "스페인",
      nameEn: "Spain",
      cities: "바르셀로나, 마드리드",
      emoji: "🇪🇸",
      avgPrice: "180만원~",
      mood: "city",
    },
    {
      name: "싱가포르",
      nameEn: "Singapore",
      cities: "싱가포르",
      emoji: "🇸🇬",
      avgPrice: "120만원~",
      mood: "city",
    },
    {
      name: "영국",
      nameEn: "UK",
      cities: "런던, 에든버러",
      emoji: "🇬🇧",
      avgPrice: "220만원~",
      mood: "city",
    },
  ];

  const sortedDestinations = useMemo(() => {
    return [...popularDestinations].sort((a, b) => {
      if (a.mood === preferredMood && b.mood !== preferredMood) return -1;
      if (a.mood !== preferredMood && b.mood === preferredMood) return 1;
      return 0;
    });
  }, [preferredMood]);

  const pageTheme = isDarkMode
    ? "bg-[#0B1020] text-white"
    : "bg-[#F6F7FB] text-[#111827]";

  const cardTheme = isDarkMode
    ? "bg-white/5 border-white/10 hover:border-[#7C3AED]/70"
    : "bg-white border-[#E5E7EB] hover:border-[#7C3AED]/60";

  return (
    <div className={`min-h-screen transition-colors duration-500 ${pageTheme}`}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-10 md:px-10 md:py-12">
        <header className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <div className="rounded-2xl bg-[#7C3AED] p-3 shadow-lg shadow-[#7C3AED]/25">
              <Plane className="size-6 text-white" />
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#7C3AED]">AI Travel Planner</p>
          </div>

          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-current/20 px-4 py-2 text-sm transition hover:bg-current/10"
          >
            {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
            {isDarkMode ? "라이트" : "다크"}
          </button>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-[#7C3AED]">Bold Minimalism</p>
            <h1 className="text-5xl font-semibold leading-tight md:text-7xl">
              여행은
              <br />
              강렬하게,
              <br />
              선택은 간결하게.
            </h1>
            <p className={`max-w-xl text-base leading-relaxed ${isDarkMode ? "text-white/70" : "text-[#4B5563]"}`}>
              핵심 컬러 1개와 여백 중심 레이아웃으로 집중도를 높였습니다. 취향 기반 추천을 가볍게 넣어
              "나에게 맞춰진" 첫 화면을 만드세요.
            </p>
          </div>

          <div className={`rounded-3xl border p-6 backdrop-blur ${cardTheme}`}>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#7C3AED]">취향 기반 추천</p>
            <div className="mb-4 flex gap-2">
              <Button
                onClick={() => setPreferredMood("beach")}
                variant={preferredMood === "beach" ? "default" : "outline"}
                className={preferredMood === "beach" ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9]" : ""}
              >
                바다 감성
              </Button>
              <Button
                onClick={() => setPreferredMood("city")}
                variant={preferredMood === "city" ? "default" : "outline"}
                className={preferredMood === "city" ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9]" : ""}
              >
                도시 감성
              </Button>
            </div>
            <p className={`text-sm ${isDarkMode ? "text-white/65" : "text-[#6B7280]"}`}>
              선택한 취향이 먼저 노출됩니다. (약한 개인화 MVP)
            </p>
          </div>
        </section>

        <section className={`rounded-3xl border p-4 md:p-5 ${cardTheme}`}>
          <div className="flex flex-col gap-3 md:flex-row">
            <label className="relative flex-1">
              <Search className={`absolute left-4 top-1/2 size-5 -translate-y-1/2 ${isDarkMode ? "text-white/40" : "text-[#9CA3AF]"}`} />
              <input
                type="text"
                placeholder="나라 또는 도시를 검색하세요 (예: 일본, 도쿄)"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className={`h-14 w-full rounded-2xl border pl-12 pr-4 text-base outline-none transition focus:border-[#7C3AED] ${
                  isDarkMode
                    ? "border-white/10 bg-white/5 text-white placeholder:text-white/40"
                    : "border-[#E5E7EB] bg-white text-[#111827] placeholder:text-[#9CA3AF]"
                }`}
              />
            </label>
            <Button
              onClick={() => selectedCountry && onNext(selectedCountry)}
              disabled={!selectedCountry}
              className="h-14 rounded-2xl bg-[#7C3AED] px-8 text-base text-white transition hover:bg-[#6D28D9]"
            >
              여행 시작
            </Button>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="size-5 text-[#7C3AED]" />
            <h2 className="text-xl">인기 여행지</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sortedDestinations.map((destination, index) => (
              <button
                key={destination.name}
                onClick={() => onNext(destination.name)}
                className={`group rounded-3xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cardTheme}`}
                style={{ animation: `fadeUp 450ms ease ${index * 60}ms both` }}
              >
                <p className="mb-3 text-4xl">{destination.emoji}</p>
                <h3 className="text-2xl font-medium">{destination.name}</h3>
                <p className={`mb-3 text-sm ${isDarkMode ? "text-white/60" : "text-[#6B7280]"}`}>{destination.nameEn}</p>
                <p className={`mb-4 text-xs ${isDarkMode ? "text-white/50" : "text-[#9CA3AF]"}`}>{destination.cities}</p>
                <span className="inline-flex rounded-full bg-[#7C3AED]/15 px-3 py-1 text-sm text-[#7C3AED]">
                  {destination.avgPrice}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

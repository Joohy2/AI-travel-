import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Sparkles, Lightbulb, MessageSquare } from "lucide-react";

interface PromptPageProps {
  country: string;
  options: string[];
  onNext: (prompt: string) => void;
  onBack: () => void;
}

export function PromptPage({ country, onNext, onBack }: PromptPageProps) {
  const [prompt, setPrompt] = useState("");

  const examplePrompts = [
    "해변 근처에 있는 인스타 감성 카페 위주로 추천해줘",
    "인플루언서가 자주 가는 숨은 맛집을 포함해줘",
    "일출과 일몰 명소를 꼭 넣어주고, 사진 찍기 좋은 곳 위주로",
    "현지인들이 가는 로컬 장소를 많이 포함해줘",
    "가족 여행이라 아이들이 좋아할만한 장소 추천해줘",
    "쇼핑과 맛집을 균형있게 섞어서 일정 짜줘",
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const handleSubmit = () => {
    if (prompt.trim()) {
      onNext(prompt);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <Card className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500 rounded-full p-4">
                <Sparkles className="size-12 text-white" />
              </div>
            </div>
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full mb-4">
              {country} 여행
            </div>
            <h1 className="text-3xl text-blue-600 mb-2">
              AI에게 원하는 여행을 말해주세요
            </h1>
            <p className="text-gray-600">
              구체적으로 알려주실수록 더 정확한 추천을 받을 수 있습니다
            </p>
          </div>

          {/* 프롬프트 입력 영역 */}
          <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="size-5 text-blue-600" />
              <h2 className="text-lg text-blue-700">AI 에이전트에게 요청하기</h2>
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="예시: 일출 명소와 현지 맛집 위주로 일정을 짜주세요. 특히 SNS에서 유명한 카페를 꼭 넣어주세요."
              className="min-h-48 resize-none text-base border-2 focus:border-blue-400"
            />
            <p className="text-xs text-gray-500 mt-3">
              💡 Tip: 선호하는 관광지 유형, 식당 분위기, 이동 수단, 특별한 요청사항 등을 자유롭게 작성하세요
            </p>
          </Card>

          {/* 예시 프롬프트 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="size-5 text-yellow-500" />
              <h3 className="text-lg text-gray-700">예시 프롬프트</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-sm"
                >
                  <span className="text-blue-500 mr-2">💬</span>
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* AI 분석 프리뷰 */}
          {prompt && (
            <Card className="p-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-start gap-3">
                <Sparkles className="size-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-purple-700 mb-2">AI가 분석할 내용:</h3>
                  <p className="text-sm text-gray-700">
                    "{prompt}"
                  </p>
                  <p className="text-xs text-purple-600 mt-2">
                    ✨ 이 요청을 바탕으로 최적의 여행 일정을 생성합니다
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-6 rounded-full text-lg"
            >
              이전
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles className="size-5" />
              AI 분석 시작
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            * 프롬프트를 작성하지 않으면 선택한 옵션만으로 분석합니다
          </p>
        </Card>
      </div>
    </div>
  );
}
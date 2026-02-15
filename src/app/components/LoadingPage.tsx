import { Plane, Sparkles } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* 애니메이션 아이콘 영역 */}
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative bg-white p-8 rounded-full shadow-xl">
            <Plane 
              size={64} 
              className="text-blue-500 animate-bounce transition-transform" 
              style={{ transform: 'rotate(-10deg)' }}
            />
          </div>
          {/* 반짝이 효과 */}
          <Sparkles className="absolute -top-2 -right-2 size-8 text-yellow-400 animate-pulse" />
        </div>

        {/* 텍스트 메시지 */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          AI 에이전트가 여행을 설계 중입니다
        </h2>
        <div className="flex flex-col gap-2">
          <p className="text-blue-600 font-medium animate-pulse">
            최적의 동선과 맛집을 분석하고 있어요...
          </p>
          <div className="w-48 h-1.5 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-progress-bar shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                 style={{ width: '100%', transformOrigin: 'left' }} />
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mt-8">
          잠시만 기다려 주시면 완벽한 일정을 보여드릴게요!
        </p>
      </div>
    </div>
  );
}
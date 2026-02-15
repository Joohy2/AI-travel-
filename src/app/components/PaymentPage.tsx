import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { CheckCircle2, CreditCard, Calendar, Lock } from "lucide-react";

interface PaymentPageProps {
  country: string;
  selectedRoute: string;
  onBack: () => void;
}

export function PaymentPage({ country, selectedRoute, onBack }: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="size-24 text-green-500" />
          </div>
          <h1 className="text-3xl mb-4 text-green-600">예약 완료!</h1>
          <p className="text-gray-600 mb-8">
            {country} 여행 일정이 성공적으로 예약되었습니다.<br />
            예약 확인 메일이 발송되었습니다.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">예약 번호</p>
            <p className="text-2xl text-blue-600">TR-2026-02-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-full text-lg"
          >
            새 여행 계획하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 text-blue-600 px-6 py-2 rounded-full mb-4">
              {country} 여행
            </div>
            <h1 className="text-3xl text-blue-600">
              결제
            </h1>
          </div>

          {/* 예약 요약 */}
          <Card className="p-6 mb-6 bg-blue-50">
            <h2 className="text-xl mb-4 text-blue-700">예약 요약</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">항공권 (왕복)</span>
                <span className="font-semibold">40만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">숙소 (3박)</span>
                <span className="font-semibold">45만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">투어 & 액티비티</span>
                <span className="font-semibold">20만원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">예상 식비</span>
                <span className="font-semibold">7만원</span>
              </div>
              <div className="border-t border-blue-300 pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">총 금액</span>
                  <span className="font-bold text-blue-600">112만원</span>
                </div>
              </div>
            </div>
          </Card>

          {/* 결제 정보 입력 */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl mb-4 flex items-center gap-2">
              <CreditCard className="size-6 text-blue-500" />
              결제 정보
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">카드 번호</label>
                <Input 
                  type="text" 
                  placeholder="1234 5678 9012 3456"
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">유효기간</label>
                  <Input 
                    type="text" 
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">CVC</label>
                  <Input 
                    type="text" 
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">카드 소유자명</label>
                <Input 
                  type="text" 
                  placeholder="홍길동"
                />
              </div>
            </div>
          </Card>

          {/* 여행자 정보 */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl mb-4">여행자 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">이름 (여권상 영문)</label>
                <Input 
                  type="text" 
                  placeholder="HONG GILDONG"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">생년월일</label>
                  <Input 
                    type="text" 
                    placeholder="1990-01-01"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">연락처</label>
                  <Input 
                    type="text" 
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">이메일</label>
                <Input 
                  type="email" 
                  placeholder="example@email.com"
                />
              </div>
            </div>
          </Card>

          {/* 보안 안내 */}
          <div className="flex items-center gap-2 justify-center text-sm text-gray-600 mb-6">
            <Lock className="size-4" />
            <span>안전한 결제를 위해 SSL 암호화가 적용됩니다</span>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-6 rounded-full text-lg"
              disabled={isProcessing}
            >
              이전
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-full text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? "처리 중..." : "결제하기"}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            * 이 프로토타입은 실제 결제가 진행되지 않습니다
          </p>
        </div>
      </div>
    </div>
  );
}
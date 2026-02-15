import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { OptionsPage } from "./components/OptionsPage";
import { PromptPage } from "./components/PromptPage";
import { ResultsPage } from "./components/ResultsPage";
import { PaymentPage } from "./components/PaymentPage";
import { LoadingPage } from "./components/LoadingPage"; // 1. 로딩 페이지 임포트

// 2. "loading" 타입을 추가합니다.
type Page = "home" | "options" | "prompt" | "loading" | "results" | "payment";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [country, setCountry] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setCurrentPage("options");
  };

  const handleOptionsSubmit = (selectedOptions: string[], userPrompt: string) => {
    setOptions(selectedOptions);
    setPrompt(userPrompt);
    
    // 바로 결과로 가지 않고 '로딩' 페이지를 먼저 보여줍니다.
    setCurrentPage("loading");
    
    // AI 분석 시뮬레이션 (시간을 3초 정도로 늘리면 더 분석하는 느낌이 납니다)
    setTimeout(() => {
      setCurrentPage("results");
    }, 3000); 
  };

  const handleRouteSelect = (route: string) => {
    setSelectedRoute(route);
    setCurrentPage("payment");
  };

  return (
    <div className="size-full">
      {currentPage === "home" && <HomePage onNext={handleCountrySelect} />}
      
      {currentPage === "options" && (
        <OptionsPage 
          country={country}
          onNext={handleOptionsSubmit}
          onBack={() => setCurrentPage("home")}
        />
      )}

      {/* 4. 로딩 페이지 렌더링 조건을 추가합니다. */}
      {currentPage === "loading" && <LoadingPage />}
      
      {currentPage === "results" && (
        <ResultsPage 
          country={country}
          options={options}
          prompt={prompt}
          onNext={handleRouteSelect}
          onBack={() => setCurrentPage("options")}
        />
      )}
      
      {currentPage === "payment" && (
        <PaymentPage 
          country={country}
          selectedRoute={selectedRoute}
          onBack={() => setCurrentPage("results")}
        />
      )}
    </div>
  );
}
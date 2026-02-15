import { MapPin } from "lucide-react";

interface RouteMapProps {
  routeName: string;
  color?: "red" | "blue" | "green";
}

export function RouteMap({ routeName, color = "red" }: RouteMapProps) {
  // 경로별 포인트 데이터 (실제로는 API에서 가져올 데이터)
  const routePoints = {
    optimal: [
      { x: 80, y: 320, label: "공항", icon: "✈️" },
      { x: 160, y: 250, label: "호텔", icon: "🏨" },
      { x: 240, y: 180, label: "관광지", icon: "🗼" },
      { x: 300, y: 140, label: "맛집", icon: "🍜" },
      { x: 340, y: 100, label: "해변", icon: "🏖️" },
    ],
    budget: [
      { x: 90, y: 310, label: "공항", icon: "✈️" },
      { x: 140, y: 260, label: "숙소", icon: "🏠" },
      { x: 220, y: 200, label: "무료관광", icon: "🎭" },
      { x: 290, y: 150, label: "재래시장", icon: "🛒" },
      { x: 350, y: 90, label: "카페거리", icon: "☕" },
    ],
    oceanview: [
      { x: 70, y: 330, label: "공항", icon: "✈️" },
      { x: 150, y: 240, label: "리조트", icon: "🏝️" },
      { x: 230, y: 170, label: "해변", icon: "🏖️" },
      { x: 300, y: 120, label: "요트투어", icon: "⛵" },
      { x: 360, y: 80, label: "비치클럽", icon: "🍹" },
    ],
  };

  const points = routePoints[routeName as keyof typeof routePoints] || routePoints.optimal;

  // 색상 설정
  const colorMap = {
    red: { stroke: "#EF4444", fill: "#DC2626", glow: "#FCA5A5" },
    blue: { stroke: "#3B82F6", fill: "#2563EB", glow: "#93C5FD" },
    green: { stroke: "#10B981", fill: "#059669", glow: "#6EE7B7" },
  };

  const colors = colorMap[color];

  // 곡선 경로 생성
  const createPath = () => {
    if (points.length < 2) return "";
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // 부드러운 곡선을 위한 제어점 계산
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      
      path += ` Q ${midX} ${midY - 30} ${next.x} ${next.y}`;
    }
    
    return path;
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl overflow-hidden">
      {/* 배경 그리드 */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* 메인 지도 SVG */}
      <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* 그림자 효과 */}
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          
          {/* 글로우 효과 */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 애니메이션 그라디언트 */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.stroke} stopOpacity="0.6" />
            <stop offset="50%" stopColor={colors.fill} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.stroke} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* 경로 배경 (글로우 효과) */}
        <path
          d={createPath()}
          stroke={colors.glow}
          strokeWidth="12"
          fill="none"
          opacity="0.4"
          filter="url(#glow)"
        />

        {/* 메인 경로 선 */}
        <path
          d={createPath()}
          stroke="url(#lineGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#shadow)"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 1000"
            to="1000 0"
            dur="2s"
            fill="freeze"
          />
        </path>

        {/* 이동 애니메이션 점 */}
        <circle r="6" fill={colors.fill} opacity="0.8">
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath href={`#route-path-${routeName}`} />
          </animateMotion>
        </circle>
        <path id={`route-path-${routeName}`} d={createPath()} fill="none" opacity="0" />

        {/* 포인트와 연결선 */}
        {points.map((point, index) => (
          <g key={index}>
            {/* 포인트 그림자 */}
            <circle
              cx={point.x}
              cy={point.y}
              r="18"
              fill={colors.glow}
              opacity="0.3"
              filter="url(#glow)"
            />
            
            {/* 메인 포인트 */}
            <circle
              cx={point.x}
              cy={point.y}
              r="14"
              fill="white"
              stroke={colors.fill}
              strokeWidth="3"
              filter="url(#shadow)"
            >
              <animate
                attributeName="r"
                values="14;16;14"
                dur="2s"
                begin={`${index * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            
            {/* 숫자 표시 */}
            <text
              x={point.x}
              y={point.y + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={colors.fill}
            >
              {index + 1}
            </text>
          </g>
        ))}
      </svg>

      {/* 포인트 라벨 (HTML 오버레이) */}
      <div className="absolute inset-0">
        {points.map((point, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2"
            style={{
              left: `${(point.x / 400) * 100}%`,
              top: `${(point.y / 400) * 100 - 10}%`,
            }}
          >
            <div className="bg-white px-3 py-1 rounded-full shadow-lg text-xs whitespace-nowrap border-2 animate-in fade-in slide-in-from-bottom-2"
              style={{
                borderColor: colors.stroke,
                animationDelay: `${index * 0.2}s`,
                animationDuration: "0.5s",
                animationFillMode: "both",
              }}
            >
              <span className="mr-1">{point.icon}</span>
              <span className="font-semibold">{point.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 범례 */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <div 
              className="w-8 h-1 rounded-full" 
              style={{ backgroundColor: colors.stroke }}
            />
            <span className="text-gray-600">이동 경로</span>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <MapPin className="size-3" style={{ color: colors.fill }} />
            <span className="text-gray-600">주요 지점</span>
          </div>
        </div>
      </div>
    </div>
  );
}

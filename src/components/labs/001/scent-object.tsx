import type { Product } from "@/components/labs/001/products";

function BottleSvg({ gradient, id }: { gradient: [string, string]; id: string }) {
  return (
    <svg viewBox="0 0 120 220" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <rect x="42" y="8" width="36" height="22" rx="4" fill="#171512" opacity="0.85" />
      <rect x="50" y="0" width="20" height="12" rx="2" fill="#171512" />
      <rect
        x="18"
        y="30"
        width="84"
        height="182"
        rx="10"
        fill={`url(#${id})`}
      />
      <rect
        x="18"
        y="30"
        width="84"
        height="182"
        rx="10"
        fill="white"
        opacity="0.05"
      />
      <rect x="30" y="90" width="60" height="42" rx="1" fill="#F6F1E9" opacity="0.14" />
    </svg>
  );
}

function SprayBottleSvg({ gradient, id }: { gradient: [string, string]; id: string }) {
  return (
    <svg viewBox="0 0 120 220" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <rect x="48" y="0" width="24" height="14" rx="3" fill="#B4915B" />
      <rect x="40" y="14" width="40" height="16" rx="3" fill="#171512" />
      <path
        d={`M28 34 L92 34 L98 210 Q98 218 90 218 L30 218 Q22 218 22 210 Z`}
        fill={`url(#${id})`}
      />
      <path
        d="M28 34 L92 34 L98 210 Q98 218 90 218 L30 218 Q22 218 22 210 Z"
        fill="white"
        opacity="0.05"
      />
    </svg>
  );
}

function CandleSvg({ gradient, id }: { gradient: [string, string]; id: string }) {
  return (
    <svg viewBox="0 0 140 180" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <rect x="20" y="40" width="100" height="130" rx="4" fill={`url(#${id})`} />
      <rect x="20" y="40" width="100" height="130" rx="4" fill="white" opacity="0.04" />
      <ellipse cx="70" cy="40" rx="50" ry="8" fill="#F6F1E9" opacity="0.18" />
      <line x1="70" y1="22" x2="70" y2="40" stroke="#171512" strokeWidth="1.5" />
      <path d="M70 8 Q76 16 70 22 Q64 16 70 8Z" fill="#B4915B" />
    </svg>
  );
}

function DiffuserSvg({ gradient, id }: { gradient: [string, string]; id: string }) {
  return (
    <svg viewBox="0 0 120 220" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <rect x="30" y="90" width="60" height="110" rx="8" fill={`url(#${id})`} />
      <rect x="30" y="90" width="60" height="110" rx="8" fill="white" opacity="0.04" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={40 + i * 10}
          y1={95}
          x2={34 + i * 10}
          y2={6}
          stroke="#B4915B"
          strokeWidth="1.4"
          opacity={0.7}
        />
      ))}
    </svg>
  );
}

function JarSvg({ gradient, id }: { gradient: [string, string]; id: string }) {
  return (
    <svg viewBox="0 0 130 160" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <rect x="20" y="50" width="90" height="100" rx="14" fill={`url(#${id})`} />
      <rect x="20" y="50" width="90" height="100" rx="14" fill="white" opacity="0.05" />
      <rect x="30" y="34" width="70" height="20" rx="6" fill="#171512" opacity="0.9" />
    </svg>
  );
}

const SHAPES = {
  flacon: BottleSvg,
  spray: SprayBottleSvg,
  candle: CandleSvg,
  diffuser: DiffuserSvg,
  jar: JarSvg,
};

export function ScentObject({ product }: { product: Product }) {
  const Shape = SHAPES[product.shape];
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,#FBF7F0,#EDE4D5)] p-8">
      <div className="h-full max-h-[70%] w-auto max-w-[55%]">
        <Shape gradient={product.gradient} id={product.slug} />
      </div>
    </div>
  );
}


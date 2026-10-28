import type { FeatureIcon } from "@/content/essay";

type IconProps = {
  name: FeatureIcon;
};

export function FeatureIcon({ name }: IconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "spine") {
    return (
      <svg {...common}>
        <path d="M7 4.5h7.2L19 9.2V19.5H7z" />
        <path d="M14.2 4.8V9.2H19" />
        <path d="M10 13h6" />
        <path d="M10 16h3.5" />
      </svg>
    );
  }

  if (name === "talk") {
    return (
      <svg {...common}>
        <path d="M5.5 7.5h8.2a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H9.2L6.8 16.2V14H6.5a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z" />
        <path d="M10.2 10.2h5.2a1 1 0 0 1 1 1v3.2" />
      </svg>
    );
  }

  if (name === "seal") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="6.25" />
        <path d="M9.1 12.15 11 14l3.9-4.15" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="9" cy="9" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="9" cy="15" r="1.35" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  );
}

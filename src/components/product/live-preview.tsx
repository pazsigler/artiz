"use client";

import { useCustomizationStore } from "@/store/customization";
import type { PreviewConfig } from "@/types";

interface LivePreviewProps {
  productImage: string;
  config: PreviewConfig;
}

export function LivePreview({ productImage, config }: LivePreviewProps) {
  const text = useCustomizationStore((s) => s.text);
  const font = useCustomizationStore((s) => s.font);

  const activeFont = font || config.defaultFont;

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-xl border bg-white">
      {/* Product base image */}
      <img
        src={productImage}
        alt="תצוגה מקדימה"
        className="w-full h-full object-contain"
      />

      {/* Text overlay */}
      {text && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: `${config.position.y}%`,
            left: `${config.position.x}%`,
            width: `${config.width}%`,
            height: `${config.height}%`,
            display: "flex",
            alignItems: "center",
            justifyContent:
              config.alignment === "center"
                ? "center"
                : config.alignment === "right"
                ? "flex-end"
                : "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: activeFont,
              color: config.textColor,
              fontSize: "clamp(12px, 3vw, 28px)",
              textAlign: config.alignment,
              wordBreak: "break-word",
              lineHeight: 1.3,
              width: "100%",
            }}
          >
            {text}
          </span>
        </div>
      )}
    </div>
  );
}

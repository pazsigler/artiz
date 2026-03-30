"use client";

import { useCustomizationStore } from "@/store/customization";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PreviewConfig } from "@/types";

interface CustomizationPanelProps {
  config: PreviewConfig;
}

export function CustomizationPanel({ config }: CustomizationPanelProps) {
  const { text, font, setText, setFont } = useCustomizationStore();
  const activeFont = font || config.defaultFont;
  const charsLeft = config.maxChars - text.length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="custom-text" className="text-base font-medium">
          הטקסט שלך
        </Label>
        <Input
          id="custom-text"
          value={text}
          onChange={(e) => {
            if (e.target.value.length <= config.maxChars) {
              setText(e.target.value);
            }
          }}
          placeholder="הקלד את הטקסט כאן..."
          className="text-lg"
          dir="rtl"
        />
        <p className="text-sm text-muted-foreground">
          {charsLeft > 0 ? (
            <>נותרו {charsLeft} תווים</>
          ) : (
            <span className="text-destructive">הגעת למגבלת התווים</span>
          )}
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-medium">בחר פונט</Label>
        <Select value={activeFont} onValueChange={(v) => v && setFont(v)}>
          <SelectTrigger>
            <SelectValue placeholder="בחר פונט" />
          </SelectTrigger>
          <SelectContent>
            {config.fontOptions.map((fontName) => (
              <SelectItem key={fontName} value={fontName}>
                <span style={{ fontFamily: fontName }}>{fontName}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

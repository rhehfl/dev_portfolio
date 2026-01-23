'use client';

import { ViewMode } from '@/components/overlays/type';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Maximize2, AppWindow, PanelRight } from 'lucide-react';

interface ViewModeSelectProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewModeSelect({ value, onChange }: ViewModeSelectProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as ViewMode)}>
      <SelectTrigger>
        <SelectValue placeholder="화면 모드 선택" />
      </SelectTrigger>

      <SelectContent side="bottom" className="h-28">
        <SelectItem value="fullscreen">
          <div className="flex items-center gap-2">
            <Maximize2 className="h-4 w-4 text-muted-foreground" />
            <span>전체화면</span>
          </div>
        </SelectItem>

        <SelectItem value="modal">
          <div className="flex items-center gap-2">
            <AppWindow className="h-4 w-4 text-muted-foreground" />
            <span>모달 보기</span>
          </div>
        </SelectItem>

        <SelectItem value="drawer">
          <div className="flex items-center gap-2">
            <PanelRight className="h-4 w-4 text-muted-foreground" />
            <span>사이드 패널</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

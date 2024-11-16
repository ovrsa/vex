"use client"

// react hook
import React, { useMemo } from "react"

// discripts data
import { District, districts } from "@/assets/districts"

// ui components
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"


export const DistrictSelectPopover = ({onChange}: {
  /** 
   * 地区選択
   * 地区のデータは "@/data/districts" から取得
   * ユーザーがリストから地区を選択すると、`onChange` 関数が呼び出され、
   * 選択された地区の値が親コンポーネントに通知される
   * 
   * onChange - 地区選択
   * selectedDistrict - 選択された地区
   * open - ポップオーバーの開閉
   * value - 選択された地区の値
   */
  onChange: (value: string | null) => void;
  selectedDistrict: string;
}) => {
  const [open, setOpen] = React.useState(false)
  const [selectedDistrict, setSelectedDistrict] = React.useState<District | null>(null);

  const handleSelect = (value: string) => {
    const newDistrict = districts.find((district) => district.value === value) || null;
    setSelectedDistrict(newDistrict); 
    onChange(newDistrict ? newDistrict.value : null);
    setOpen(false);
  };

  const districtItems = useMemo(() => {
    return districts.map((district) => (
      <CommandItem
        key={district.value}
        value={district.value}
        onSelect={handleSelect}
      >
        {district.label}
      </CommandItem>
    ));
  }, [districts]);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"outline"}
          className={cn("w-[280px] justify-start m-auto font-normal",
          !selectedDistrict && "text-muted-foreground",
          )}>
            {selectedDistrict ? selectedDistrict.label : "Select District"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput placeholder="Select district..." />
            <CommandList>
              <CommandGroup>
                {districtItems}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

"use client"

import * as React from "react"

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

type District = {
  value: string
  label: string
}
 
// TODO DBで管理
const districts: District[] = [
  {
    value: "北海道",
    label: "北海道",
  },
  {
    value: "北海道(札幌市)",
    label: "北海道(札幌市)",
  },
  {
    value: "北海道(函館市)",
    label: "北海道(函館市)",
  },
  {
    value: "北海道(旭川市)",
    label: "北海道(旭川市)",
  },
  {
    value: "宮城県",
    label: "宮城県",
  },
  {
    value: "青森県",
    label: "青森県",
  },
  {
    value: "岩手県",
    label: "岩手県",
  },
  {
    value: "秋田県",
    label: "秋田県",
  },
  {
    value: "山形県",
    label: "山形県",
  },
  {
    value: "福島県",
    label: "福島県",
  },
  {
    value: "東京都",
    label: "東京都",
  },
  {
    value: "東京都(千代田区)",
    label: "東京都(千代田区)",
  },
  {  
    value: "東京都(中央区)",
    label: "東京都(中央区)",
  },
  {
    value: "東京都(港区)",
    label: "東京都(港区)",
  },
  {
    value: "東京都(新宿区)",
    label: "東京都(新宿区)",
  },
  {
    value: "東京都(文京区)",
    label: "東京都(文京区)",
  },
  {
    value: "東京都(台東区)",
    label: "東京都(台東区)",
  },
  {
    value: "東京都(墨田区)",
    label: "東京都(墨田区)",
  },
  {
    value: "東京都(江東区)",
    label: "東京都(江東区)",
  },
  {
    value: "東京都(品川区)",
    label: "東京都(品川区)",
  },
  {
    value: "東京都(目黒区)",
    label: "東京都(目黒区)",
  },
  {
    value: "東京都(大田区)",
    label: "東京都(大田区)",
  },
  {
    value: "東京都(世田谷区)",
    label: "東京都(世田谷区)",
  },
  {
    value: "東京都(渋谷区)",
    label: "東京都(渋谷区)",
  },
  {
    value: "東京都(中野区)",
    label: "東京都(中野区)",
  },
  {
    value: "東京都(杉並区)",
    label: "東京都(杉並区)",
  },
  {
    value: "東京都(豊島区)",
    label: "東京都(豊島区)",
  },
  {
    value: "東京都(北区)",
    label: "東京都(北区)",
  },
  {
    value: "東京都(荒川区)",
    label: "東京都(荒川区)",
  },
  {
    value: "東京都(板橋区)",
    label: "東京都(板橋区)",
  },
  {
    value: "東京都(練馬区)",
    label: "東京都(練馬区)",
  },
  {
    value: "東京都(足立区)",
    label: "東京都(足立区)",
  },
  {
    value: "東京都(葛飾区)",
    label: "東京都(葛飾区)",
  },
  {
    value: "東京都(江戸川区)",
    label: "東京都(江戸川区)",
  },
  {
    value: "東京都(八王子市)",
    label: "東京都(八王子市)",
  },
  {
    value: "東京都(立川市)",
    label: "東京都(立川市)",
  },
  {
    value: "東京都(武蔵野市)",
    label: "東京都(武蔵野市)",
  },
  {
    value: "東京都(町田市)",
    label: "東京都(町田市)",
  },
  {
    value: "東京都(多摩市)",
    label: "東京都(多摩市)",
  },
  {
    value: "神奈川県",
    label: "神奈川県",
  },
  {
    value: "神奈川県(横浜市)",
    label: "神奈川県(横浜市)",
  },
  {
    value: "神奈川県(川崎市)",
    label: "神奈川県(川崎市)",
  },
{
    value: "神奈川県(相模原市)",
    label: "神奈川県(相模原市)",
  },
  {
    value: "神奈川県(鎌倉市)",
    label: "神奈川県(鎌倉市)",
  },
  {
    value: "神奈川県(横須賀市)",
    label: "神奈川県(横須賀市)",
  },
  {
    value: "神奈川県(箱根町)",
    label: "神奈川県(箱根町)",
  },
  { 
    value: "千葉県",
    label: "千葉県",
  },
  {
    value: "千葉県(千葉市)",
    label: "千葉県(千葉市)",
  },
  {
    value: "千葉県(船橋市)",
    label: "千葉県(船橋市)",
  },
  {
    value: "千葉県(柏市)",
    label: "千葉県(柏市)",
  },
  {
    value: "埼玉県",
    label: "埼玉県",
  },
  {
    value: "群馬県(高崎市)",
    label: "群馬県(高崎市)",
  },
  {
    value: "群馬県(草津町)",
    label: "群馬県(草津町)",
  },
  {
    value: "栃木県",
    label: "栃木県",
  },
  {
    value: "茨城県",
    label: "茨城県",
  },
  {
    value: "山梨県",
    label: "山梨県",
  },
  {
    value: "長野県",
    label: "長野県",
  },
  {
    value: "長野県(長野市)",
    label: "長野県(長野市)",
  },
  {
    value: "長野県(松本市)",
    label: "長野県(松本市)",
  },
  {
    value: "長野県(軽井沢町)",
    label: "長野県(軽井沢町)",
  },
  {
    value: "新潟県",
    label: "新潟県",
  },
  {
    value: "愛知県",
    label: "愛知県",
  },
  {
    value: "愛知県(名古屋市)",
    label: "愛知県(名古屋市)",
  },
  {
    value: "愛知県(岡崎市)",
    label: "愛知県(岡崎市)",
  },
  {
    value: "愛知県(豊田市)",
    label: "愛知県(豊田市)",
  },
  {
    value: "岐阜県",
    label: "岐阜県",
  },
  {
    value: "三重県",
    label: "三重県",
  },
  {
    value: "静岡県",
    label: "静岡県",
  },
  {
    value: "静岡県(静岡市)",
    label: "静岡県(静岡市)",
  },
  {
    value: "静岡県(浜松市)",
    label: "静岡県(浜松市)",
  },
  {
    value: "静岡県(御殿場市)",
    label: "静岡県(御殿場市)",
  },
  {
    value: "石川県",
    label: "石川県",
  },
  {
    value: "富山県",
    label: "富山県",
  },
  {
    value: "福井県",
    label: "福井県",
  },
  {
    value: "大阪府",
    label: "大阪府",
  },
  {
    value: "大阪府(大阪市)",
    label: "大阪府(大阪市)",
  },
  {
    value: "大阪府(堺市)",
    label: "大阪府(堺市)",
  },
  {
    value: "大阪府(豊中市)",
    label: "大阪府(豊中市)",
  },
  {
    value: "大阪府(吹田市)",
    label: "大阪府(吹田市)",
  },
  {
    value: "大阪府(枚方市)",
    label: "大阪府(枚方市)",
  },
  {
    value: "京都府",
    label: "京都府",
  },
  {
    value: "兵庫県",
    label: "兵庫県",
  },
  {
    value: "兵庫県(神戸市)",
    label: "兵庫県(神戸市)",
  },
  {
    value: "兵庫県(姫路市)",
    label: "兵庫県(姫路市)",
  },
  {
    value: "兵庫県(西宮市)",
    label: "兵庫県(西宮市)",
  },
  {
    value: "奈良県",
    label: "奈良県",
  },
  {
    value: "和歌山県",
    label: "和歌山県",
  },
  {
    value: "滋賀県",
    label: "滋賀県",
  },
  {
    value: "広島県",
    label: "広島県",
  },
  {
    value: "広島県(広島市)",
    label: "広島県(広島市)",
  },
  {
    value: "広島県(福山市)",
    label: "広島県(福山市)",
  },
  {
    value: "岡山県",
    label: "岡山県",
  },
  {
    value: "岡山県(岡山市)",
    label: "岡山県(岡山市)",
  },
  {
    value: "岡山県(倉敷市)",
    label: "岡山県(倉敷市)",
  },
  {
    value: "山口県",
    label: "山口県",
  },
  {
    value: "鳥取県",
    label: "鳥取県",
  },
  {
    value: "島根県",
    label: "島根県",
  },
  {
    value: "香川県",
    label: "香川県",
  },
  {
    value: "愛媛県",
    label: "愛媛県",
  },
  {
    value: "徳島県",
    label: "徳島県",
  },
  {
    value: "高知県",
    label: "高知県",
  },
  {
    value: "福岡県",
    label: "福岡県",
  },
  {
    value: "佐賀県",
    label: "佐賀県",
  },
  {
    value: "長崎県",
    label: "長崎県",
  },
  {
    value: "熊本県",
    label: "熊本県",
  },
  {
    value: "大分県",
    label: "大分県",
  },
  {
    value: "宮崎県",
    label: "宮崎県",
  },
  {
    value: "鹿児島県",
    label: "鹿児島県",
  },
  {
    value: "沖縄県",
    label: "沖縄県",
  },
]



export function ComboboxPopover({
  onChange,
}: {
  selectedDistricts: District | null;
  onChange: (value: string | null) => void;
}) {
  const [open, setOpen] = React.useState(false)
  const [selectedDistrict, setSelectedDistrict] = React.useState<District | null>(null);

  const handleSelect = (value: string) => {
    const newDistrict = districts.find((district) => district.value === value) || null;
    setSelectedDistrict(newDistrict); // Update the selected district state
    onChange(newDistrict ? newDistrict.value : null);
    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"outline"}
          className={cn("w-[280px] justify-start m-auto font-normal",
          !selectedDistrict && "text-muted-foreground",
          "m-auto"
          )}>
          {selectedDistrict ? <>{selectedDistrict.label}</> : <>Select District</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput placeholder="Select district..." />
            <CommandList>
              <CommandGroup>
                {districts.map((district) => (
                  <CommandItem
                    key={district.value}
                    value={district.value}
                    onSelect={handleSelect}
                  >
                    {district.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

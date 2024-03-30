import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectScrollable = React.forwardRef(({ value, onChange }, ref) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>北海道</SelectLabel>
          <SelectItem value="ar0101/">北海道</SelectItem>
          <SelectItem value="ar0101100/sapporo/">札幌市</SelectItem>
          <SelectItem value="ar0101202/hakodate/">函館市</SelectItem>
          <SelectItem value="ar0101204/asahikawa/">旭川市</SelectItem>
          <SelectLabel>東北</SelectLabel>
          <SelectItem value="ar0200/">東北</SelectItem>
          <SelectItem value="ar0204/">宮城県</SelectItem>
          <SelectItem value="ar0202/">青森県</SelectItem>
          <SelectItem value="ar0203/">岩手県</SelectItem>
          <SelectItem value="ar0205/">秋田県</SelectItem>
          <SelectItem value="ar0206/">山形県</SelectItem>
          <SelectItem value="ar0207/">福島県</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
});

SelectScrollable.displayName = 'SelectScrollable';

export { SelectScrollable };

"use client"

import * as React from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const products = [
  { value: "all", label: "全商品 (All Products)" },
  { value: "prod_001", label: "モイスチャーローション" },
  { value: "prod_002", label: "ナイトクリーム" },
  { value: "prod_003", label: "UVカットジェル" },
]

interface HeaderFiltersProps {
  className?: string
}

export function HeaderFilters({ className }: HeaderFiltersProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 2, 31),
    to: new Date(2025, 4, 14),
  })

  const [openProduct, setOpenProduct] = React.useState(false)
  const [productValue, setProductValue] = React.useState("")
  const [brandValue, setBrandValue] = React.useState("brand_a")

  return (
    <div className={cn("flex gap-3 w-full", className)}>
      
      {/* 1. ブランド選択 */}
      <div className="flex-1 min-w-0">
        <Select value={brandValue} onValueChange={setBrandValue}>
          <SelectTrigger className="w-full h-9 rounded-full bg-white border-gray-200 text-xs font-medium shadow-sm">
            <SelectValue placeholder="ブランドを選択" />
          </SelectTrigger>
          {/* 修正: bg-white を追加して透過を防止 */}
          <SelectContent className="bg-white">
            <SelectItem value="brand_a">Brand A</SelectItem>
            <SelectItem value="brand_b">Brand B</SelectItem>
            <SelectItem value="brand_c">Brand C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 2. 商品選択 */}
      <div className="flex-1 min-w-0">
        <Popover open={openProduct} onOpenChange={setOpenProduct}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openProduct}
              className="w-full h-9 justify-between rounded-full bg-white border-gray-200 text-xs font-medium shadow-sm px-3"
            >
              <span className="truncate">
                {productValue
                  ? products.find((product) => product.value === productValue)?.label
                  : "商品を選択..."}
              </span>
              <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          {/* 修正: bg-white を追加 */}
          <PopoverContent className="w-[200px] p-0 bg-white" align="start">
            <Command className="bg-white">
              <CommandInput placeholder="Search..." className="h-9" />
              <CommandList>
                <CommandEmpty>No product found.</CommandEmpty>
                <CommandGroup>
                  {products.map((product) => (
                    <CommandItem
                      key={product.value}
                      value={product.value}
                      onSelect={(currentValue) => {
                        setProductValue(currentValue === productValue ? "" : currentValue)
                        setOpenProduct(false)
                      }}
                      className="text-xs"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-3 w-3",
                          productValue === product.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {product.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* 3. 期間選択 */}
      <div className="flex-1 min-w-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full h-9 justify-start text-left font-normal rounded-full bg-white border-gray-200 text-xs shadow-sm px-3",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-3 w-3 shrink-0" />
              <span className="truncate">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "yyyy/MM/dd")} - {format(date.to, "yyyy/MM/dd")}
                    </>
                  ) : (
                    format(date.from, "yyyy/MM/dd")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </span>
            </Button>
          </PopoverTrigger>
          {/* 修正: bg-white を追加（カレンダーは大丈夫そうとのことでしたが念のため統一） */}
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ja}
              className="bg-white rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
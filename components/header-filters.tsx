// components/header-filters.tsx
"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
// Selectはメーカー用には使わなくなるため、インポートは残しておきますが不使用でもOK

// ■ 追加: APIクライアント関数をインポート
import { fetchFilterOptions } from "@/lib/api-client"

interface HeaderFiltersProps {
  className?: string
}

export function HeaderFilters({ className }: HeaderFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialManufacturer = searchParams.get("manufacturer") || "all"
  const initialProduct = searchParams.get("product") || ""
  
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 2, 31),
    to: new Date(2025, 4, 14),
  })

  // ■ 修正: メーカー選択用のOpen状態を追加
  const [openManufacturer, setOpenManufacturer] = React.useState(false)
  const [openProduct, setOpenProduct] = React.useState(false)
  
  const [productValue, setProductValue] = React.useState(initialProduct)
  const [manufacturerValue, setManufacturerValue] = React.useState(initialManufacturer)

  // ■ 追加: DBから取得したリストを管理するState
  const [manufacturerList, setManufacturerList] = React.useState<string[]>([])
  const [productList, setProductList] = React.useState<string[]>([])

  // ■ 追加: 画面表示時 & メーカー変更時にリストを取得する
  React.useEffect(() => {
    const loadOptions = async () => {
      // APIからデータを取得
      const options = await fetchFilterOptions(manufacturerValue)
      setManufacturerList(options.manufacturers)
      setProductList(options.products)
    }
    loadOptions()
  }, [manufacturerValue]) // manufacturerValueが変わるたびに再実行

  // 共通のURL更新関数
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all" && value !== "") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  // ■ 修正: メーカー変更ハンドラ (Commandコンポーネント用)
  const handleManufacturerChange = (value: string) => {
    const newValue = value === manufacturerValue ? "all" : value
    setManufacturerValue(newValue)
    setOpenManufacturer(false)
    
    // メーカーを変えたら商品はリセットする
    setProductValue("")
    updateFilter("product", null)
    
    updateFilter("manufacturer", newValue)
  }

  // ■ 修正: 商品変更ハンドラ (URL更新を追加)
  const handleProductChange = (val: string) => {
    // 「全商品」が選ばれたか、同じ値をクリックしたら選択解除（空文字へ）
    const newValue = (val === "all-products" || val === productValue) ? "" : val
    setProductValue(newValue)
    setOpenProduct(false)
    
    updateFilter("product", newValue)
  }

  return (
    <div className={cn("flex gap-3 w-full", className)}>
      
      {/* 1. メーカー選択 (修正: SelectからPopover+Commandに変更) */}
      <div className="flex-1 min-w-0">
        <Popover open={openManufacturer} onOpenChange={setOpenManufacturer}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openManufacturer}
              className="w-full h-9 justify-between rounded-full bg-white border-gray-200 text-xs font-medium shadow-sm px-3"
            >
              <span className="truncate">
                {manufacturerValue !== "all" ? manufacturerValue : "全メーカー"}
              </span>
              <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0 bg-white" align="start">
            <Command className="bg-white">
              <CommandInput placeholder="メーカーを検索..." className="h-9" />
              <CommandList className="max-h-[300px] overflow-y-auto">
                <CommandEmpty>メーカーが見つかりません</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="all"
                    onSelect={() => handleManufacturerChange("all")}
                    className="text-xs"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-3 w-3",
                        manufacturerValue === "all" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    全メーカー
                  </CommandItem>
                  {manufacturerList.map((m) => (
                    <CommandItem
                      key={m}
                      value={m}
                      onSelect={() => handleManufacturerChange(m)}
                      className="text-xs"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-3 w-3",
                          manufacturerValue === m ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {m}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
                {productValue ? productValue : "全商品"}
              </span>
              <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0 bg-white" align="start">
            <Command className="bg-white">
              <CommandInput placeholder="商品を検索..." className="h-9" />
              <CommandList className="max-h-[300px] overflow-y-auto">
                <CommandEmpty>商品が見つかりません</CommandEmpty>
                <CommandGroup>
                  {/* ■ 追加: 全商品のリセット項目 */}
                  <CommandItem
                    value="all-products"
                    onSelect={() => handleProductChange("all-products")}
                    className="text-xs font-bold text-blue-600"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-3 w-3",
                        productValue === "" ? "opacity-100" : "opacity-0"
                      )}
                    />
                    全商品 (リセット)
                  </CommandItem>

                  {/* ■ 修正: DBから取得したリストを表示 */}
                  {productList.map((prod) => (
                    <CommandItem
                      key={prod}
                      value={prod}
                      onSelect={handleProductChange}
                      className="text-xs"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-3 w-3",
                          productValue === prod ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {prod}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* 3. 期間選択 (既存のまま) */}
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
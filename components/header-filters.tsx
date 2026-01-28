"use client"

import * as React from "react"
// useTransition を追加
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react" 
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
// ■ 追加: Spinnerコンポーネントをインポート
import { Spinner } from "@/components/ui/spinner"
import { fetchFilterOptions } from "@/lib/api-client"

interface HeaderFiltersProps {
  className?: string
}

export function HeaderFilters({ className }: HeaderFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // ■ 追加: トランジション（保留状態）の管理
  // isPending は、データ取得（URL変更）の待機中に true になります
  const [isPending, startTransition] = useTransition()

  const initialManufacturer = searchParams.get("manufacturer") || "all"
  const initialProduct = searchParams.get("product") || ""
  
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 2, 31),
    to: new Date(2025, 4, 14),
  })

  const [openManufacturer, setOpenManufacturer] = React.useState(false)
  const [openProduct, setOpenProduct] = React.useState(false)
  
  const [productValue, setProductValue] = React.useState(initialProduct)
  const [manufacturerValue, setManufacturerValue] = React.useState(initialManufacturer)

  const [manufacturerList, setManufacturerList] = React.useState<string[]>([])
  const [productList, setProductList] = React.useState<string[]>([])

  React.useEffect(() => {
    const loadOptions = async () => {
      const options = await fetchFilterOptions(manufacturerValue)
      setManufacturerList(options.manufacturers)
      setProductList(options.products)
    }
    loadOptions()
  }, [manufacturerValue])

  // ■ 修正: URL更新を startTransition でラップする
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all" && value !== "") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    // ここでラップすることで、更新完了まで isPending が true になる
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false })
    })
  }

  const handleManufacturerChange = (value: string) => {
    const newValue = value === manufacturerValue ? "all" : value
    setManufacturerValue(newValue)
    setOpenManufacturer(false)
    setProductValue("")
    updateFilter("product", null)
    updateFilter("manufacturer", newValue)
  }

  const handleProductChange = (val: string) => {
    const newValue = (val === "all-products" || val === productValue) ? "" : val
    setProductValue(newValue)
    setOpenProduct(false)
    updateFilter("product", newValue)
  }

  return (
    <div className={cn("flex gap-3 w-full", className)}>
      
      {/* 1. メーカー選択 */}
      <div className="flex-1 min-w-0">
        <Popover open={openManufacturer} onOpenChange={setOpenManufacturer}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openManufacturer}
              // ■ 追加: 通信中はボタンを無効化
              disabled={isPending}
              className="w-full h-9 justify-between rounded-full bg-white border-gray-200 text-xs font-medium shadow-sm px-3"
            >
              <span className="truncate flex items-center gap-2">
                {/* ■ 追加: 通信中ならスピナーを表示、そうでなければ値 */}
                {isPending ? (
                  <>
                    <Spinner className="h-3 w-3" />
                    <span className="opacity-70">更新中...</span>
                  </>
                ) : (
                  manufacturerValue !== "all" ? manufacturerValue : "全メーカー"
                )}
              </span>
              {!isPending && <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />}
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
              // ■ 追加: 通信中は無効化
              disabled={isPending} 
              className="w-full h-9 justify-between rounded-full bg-white border-gray-200 text-xs font-medium shadow-sm px-3"
            >
              <span className="truncate flex items-center gap-2">
                {/* ■ 追加: 通信中ならスピナー */}
                {isPending ? (
                  <>
                    <Spinner className="h-3 w-3" />
                    <span className="opacity-70">更新中...</span>
                  </>
                ) : (
                   productValue ? productValue : "全商品"
                )}
              </span>
              {!isPending && <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0 bg-white" align="start">
            <Command className="bg-white">
              <CommandInput placeholder="商品を検索..." className="h-9" />
              <CommandList className="max-h-[300px] overflow-y-auto">
                <CommandEmpty>商品が見つかりません</CommandEmpty>
                <CommandGroup>
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

      {/* 3. 期間選択 */}
      <div className="flex-1 min-w-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              // ■ 追加: 期間は今のロジックだとrouter.pushしていませんが、統一感を出すためにisPendingで見栄えを制御
              disabled={isPending}
              className={cn(
                "w-full h-9 justify-start text-left font-normal rounded-full bg-white border-gray-200 text-xs shadow-sm px-3",
                !date && "text-muted-foreground"
              )}
            >
              {isPending ? (
                 <Spinner className="mr-2 h-3 w-3" />
              ) : (
                 <CalendarIcon className="mr-2 h-3 w-3 shrink-0" />
              )}
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
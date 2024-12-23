"use client"

// react hook
import axios from "axios"
import { format } from "date-fns"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

// ui components
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { ButtonLoading } from "./ui/reloadIcon"

// components
import { DistrictSelectPopover } from "./DistrictSelectBox"


type DatePickerFormProps = {
  onFormSubmit: (data: FormData) => void
}

// フォームバリデーション
const FormSchema = z.object({
  // TODO 位置情報から住所情報を取得できるようにする
  selectedDate: z.date().refine(date => date instanceof Date, {
    message: "The selected date is not valid.",
  }),
  district: z.string().min(1, {
    message: "The selected district information is not valid.",
  }),
})

export const DatePickerForm = ({ onFormSubmit }: DatePickerFormProps) => {
  /**
   *  日付と地区を選択するためのフォーム
   * ユーザーがフォームを送信すると、
   * 選択された日付と地区の情報がサーバーにPOSTリクエストとして送信される
   *
   * - `Button`: フォームの送信ボタン
   * - `Calendar`: 日付を選択するためのカレンダーUI
   * - `DistrictSelectPopover`: 地区を選択するためのポップオーバー
   */
  const datePickerForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedDate: new Date(),
      district: '',
    }
  });
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = datePickerForm.getValues();
    // const createdAt = new Date().toISOString();
    const tokenString = localStorage.getItem('sb-fhwhccswlpqiszxspnoc-auth-token');
    if (!tokenString) {
      console.error('No auth token found in localStorage');
      setIsLoading(false);
      return;
    }

    // const token = JSON.parse(tokenString);
    // const userId = token.user.id;


    try {
      // フォームデータをサーバーに送信
      const response = await axios.post("http://localhost:5001/api", JSON.stringify(formData), {
        //  const response = await axios.post("/api", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // TODO: 検索履歴保存の必要性があるか検討
      // if (response.status === 200) {
      //   const { data, error } = await supabase
      //     .from('searches')
      //     .insert([
      //       {
      //         user_id: userId,
      //         selectedDate: formData.selectedDate,
      //         district: formData.district,
      //         created_at: createdAt,
      //       }
      //     ]);

      //   if (error) {
      //     throw new Error('Error inserting data into Supabase: ' + error.message);
      //   }

      //   if (data) {
      //     onFormSubmit(data);
      //   }
      // } else {
      //   throw new Error('Failed to send data to backend');
      // }
      onFormSubmit(response.data);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...datePickerForm}>
      <form onSubmit={handleFormSubmit}
        className="space-y-8"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FormField
          control={datePickerForm.control}
          name="selectedDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Controller
                name="district"
                control={datePickerForm.control}
                render={({ field }) => (
                  <DistrictSelectPopover
                    selectedDistrict={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                        "m-auto"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("2000-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormDescription>
                Please select a district and date, then click Submit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? <ButtonLoading /> : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
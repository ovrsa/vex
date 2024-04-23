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

import { ComboboxPopover } from "./Combobox"


type DatePickerFormProps = {
  onFormSubmit: (data: any) => void
}

// フォームバリデーション
const FormSchema = z.object({
  // TODO 位置情報から住所情報を取得できるようにする
  selectedDate: z.date({
    required_error: "A date of birth is required.",
  }),
  district: z.string({
    required_error: "A status is required.",
  }),
})

export const DatePickerForm = ({ onFormSubmit }:DatePickerFormProps) => {
  const datePickerForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [isLoading, setIsLoading] = useState(false) // リクエスト送信中のローディング状態

  const handleFormSubmit = async(e: React.FormEvent) => {
    e.preventDefault() // ページリロードを防ぐ
    setIsLoading(true)
    const formData = datePickerForm.getValues();
    try {
      const response = await axios.post("http://localhost:5001/", JSON.stringify(formData),{
        headers: {
          "Content-Type": "application/json",
        },
      });
      onFormSubmit(response.data);
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // リクエスト送信完了
    } 
  };

  return (
    <Form {...datePickerForm}>
      <form onSubmit={handleFormSubmit} className="space-y-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FormField
          control={datePickerForm.control}
          name="selectedDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Controller
              name="district"
              control={datePickerForm.control}
              render={({ field }) => (
                <ComboboxPopover
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
                      date < new Date("1900-01-01")
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

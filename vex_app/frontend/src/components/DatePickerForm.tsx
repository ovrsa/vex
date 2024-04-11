"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { format } from "date-fns"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

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
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ComboboxPopover } from "./Combobox"
import { ButtonLoading } from "./ui/reloadIcon"

// DatePickerFormコンポーネントのpropsの型を定義
type DatePickerFormProps =  {
  onFormSubmit: (data: any) => void
}

const FormSchema = z.object({
  // TODO 位置情報から住所情報を取得できるようにする
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  // 文字列以外を入力するとエラーが出るようにする
  district: z.string({
    required_error: "A status is required.",
  }),
})

export function DatePickerForm({ onFormSubmit }:DatePickerFormProps) {
  // onFormSubmitで親コンポーネントに成功したことを通知
  // React Hook FormとZodを使ったフォームのバリデーション
  // z.inferを使ってFormSchemaの型を推論
  // これでform.getValues()の型がFormSchemaと同じになる
  const form = useForm<z.infer<typeof FormSchema>>({
    // useFormの引数にzodResolverを使ってFormSchemaを渡す
    resolver: zodResolver(FormSchema),
  });
  const [isLoading, setIsLoading] = useState(false)

  // リクエスト送信処理
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true) // リクエスト送信中
    const data = form.getValues();
    console.log(data)
    try {
      const response = await axios.post("http://localhost:5001/", JSON.stringify(data),{
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      onFormSubmit(response.data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // リクエスト送信完了
    } 
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Controller
              name="district"
              control={form.control}
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

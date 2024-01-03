'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import axios from 'axios'
import qs from 'query-string'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, SendHorizonal } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/hooks/use-modal-store'
import { EmojiPicker } from '@/components/emoji-picker'
import { Button } from '../ui/button'

interface ChatInputProps {
  apiUrl: string
  name: string
  query: Record<string, any>
  type: 'conversation' | 'channel'
}

const formSchema = z.object({
  content: z.string().min(1),
})

export function ChatInput({ apiUrl, name, query, type }: ChatInputProps) {
  const { onOpen } = useModalStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })

      await axios.post(url, values)

      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center'>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    className="absolute left-8 top-7 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-zinc-500 p-1 transition hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300"
                    type="button"
                    onClick={() => {
                      onOpen('messageFile', { apiUrl, query })
                    }}
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    autoComplete="off"
                    className="border-0 border-none px-14 py-6 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 bg-zinc-900"
                    disabled={isLoading}
                    placeholder={`Enviar mensaje a ${
                      type === 'conversation' ? name : '#' + name
                    }`}
                    {...field}
                  />
                  <div className="absolute right-8 top-7">
                    <EmojiPicker
                      onChange={(emoji: string) => {
                        field.onChange(`${field.value} ${emoji}`)
                      }}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary" className="p-3 mb-2 mr-2">
          <SendHorizonal className="h-5 w-5 " />
        </Button>
      </form>
    </Form>
  )
}

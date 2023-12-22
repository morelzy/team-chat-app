'use client'

import { useRouter } from 'next/navigation'
import qs from 'query-string'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'
import { useModalStore } from '@/hooks/use-modal-store'

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Attachment is required.',
  }),
})

export function MessageFileModal() {
  const { isOpen, onClose, type, data } = useModalStore()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'messageFile'
  const { apiUrl, query } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: '',
    },
  })

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      })

      await axios.post('/api/servers', {
        ...values,
        content: values.fileUrl,
      })

      form.reset()
      router.refresh()
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="primary">
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
